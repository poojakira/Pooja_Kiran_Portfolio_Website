"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TrustScene({ reducedMotion }: { reducedMotion: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frame = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let disposed = false;
    let cleanup = () => {};

    try {
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05070b, 0.055);

      const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 80);
      camera.position.set(0, 3.2, 9.4);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setClearColor(0x05070b, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0x9fb4c9, 0.55));
      const key = new THREE.PointLight(0xdde9f5, 6.5, 18);
      key.position.set(-3, 5, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0x5ab7a8, 4, 15);
      rim.position.set(5, 2, -2);
      scene.add(rim);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(34, 34),
        new THREE.MeshStandardMaterial({ color: 0x080b0f, metalness: 0.2, roughness: 0.78 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.8;
      scene.add(floor);

      const grid = new THREE.GridHelper(30, 30, 0x2a3641, 0x151d25);
      grid.position.y = -1.78;
      scene.add(grid);

      const facility = new THREE.Group();
      scene.add(facility);

      const central = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.15, 0.22, 64),
        new THREE.MeshStandardMaterial({ color: 0x151c24, metalness: 0.82, roughness: 0.26 })
      );
      central.position.y = -0.15;
      facility.add(central);

      const coreRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.25, 0.025, 12, 96),
        new THREE.MeshBasicMaterial({ color: 0x7fd2c5, transparent: true, opacity: 0.52 })
      );
      coreRing.rotation.x = Math.PI / 2;
      coreRing.position.y = 0.02;
      facility.add(coreRing);

      const panelPositions: Array<[number, number, number]> = [
        [-3.25, 1.15, -0.9],
        [0, 2.1, -2.2],
        [3.25, 1.1, -0.6]
      ];
      const panelColors = [0x315b60, 0x455a7a, 0x5a4f6f];

      panelPositions.forEach((position, index) => {
        const panel = new THREE.Group();
        const frameMesh = new THREE.Mesh(
          new THREE.BoxGeometry(2.33, 1.36, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x111820, metalness: 0.72, roughness: 0.34 })
        );
        const screen = new THREE.Mesh(
          new THREE.PlaneGeometry(2.25, 1.28),
          new THREE.MeshBasicMaterial({ color: panelColors[index], transparent: true, opacity: 0.34 })
        );
        screen.position.z = 0.045;
        panel.add(frameMesh, screen);
        panel.position.set(...position);
        panel.rotation.y = index === 0 ? 0.28 : index === 2 ? -0.28 : 0;
        facility.add(panel);
      });

      const nodePoints: Array<[number, number, number]> = [
        [-4.4, -0.6, 0.2], [-2.6, 0.1, 0.6], [-1.1, 0.65, 0.15],
        [1.1, 0.6, 0.2], [2.55, 0.05, 0.55], [4.35, -0.55, 0.15]
      ];
      const nodes: THREE.Mesh[] = [];
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6f8f91, transparent: true, opacity: 0.32 });

      nodePoints.forEach((position, index) => {
        const node = new THREE.Mesh(
          new THREE.IcosahedronGeometry(index === 2 || index === 3 ? 0.18 : 0.13, 1),
          new THREE.MeshStandardMaterial({ color: 0xbad7d3, emissive: 0x163f3b, emissiveIntensity: 0.5, metalness: 0.42, roughness: 0.34 })
        );
        node.position.set(...position);
        facility.add(node);
        nodes.push(node);
        if (index > 0) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...nodePoints[index - 1]),
            new THREE.Vector3(...position)
          ]);
          facility.add(new THREE.Line(geometry, lineMaterial));
        }
      });

      let pointerX = 0;
      let pointerY = 0;
      const onPointer = (event: PointerEvent) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      const resize = () => {
        if (!renderer) return;
        const rect = mount.getBoundingClientRect();
        camera.aspect = Math.max(rect.width, 1) / Math.max(rect.height, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height, false);
      };

      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("resize", resize);
      resize();

      const render = (time = 0) => {
        if (!renderer || disposed) return;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const scroll = Math.min(window.scrollY / maxScroll, 1);
        camera.position.z += (9.4 - scroll * 2.35 - camera.position.z) * 0.035;
        camera.position.y += (3.2 - scroll * 0.95 - camera.position.y) * 0.035;
        camera.position.x += ((reducedMotion ? 0 : pointerX * 0.35) - camera.position.x) * 0.025;
        camera.lookAt(0, 0.25 + (reducedMotion ? 0 : pointerY * -0.08), -0.4);

        facility.rotation.y = reducedMotion ? -0.02 : Math.sin(time * 0.00014) * 0.035 + pointerX * 0.018;
        coreRing.rotation.z = reducedMotion ? 0.25 : time * 0.00009;

        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(render);
      };
      render();

      cleanup = () => {
        disposed = true;
        window.cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", resize);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
            object.geometry.dispose();
            const material = object.material;
            (Array.isArray(material) ? material : [material]).forEach((item) => item.dispose());
          }
        });
        renderer?.dispose();
        renderer?.domElement.remove();
      };
    } catch {
      mount.dataset.webgl = "unavailable";
    }

    return () => cleanup();
  }, [reducedMotion]);

  return <div className="trust-scene" ref={mountRef} aria-hidden="true" />;
}
