'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Optional scenery only: all navigation and portfolio evidence live in the DOM. */
export default function TrustScene({ className = '' }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 760px)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    // Reading mode and small screens retain the architectural CSS background.
    if (connection?.saveData || compact.matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x080c10, 1);
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;opacity:0;transition:opacity 900ms ease';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090f14, 0.026);
    const camera = new THREE.PerspectiveCamera(49, 1, 0.1, 160);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    const geometry = <T extends THREE.BufferGeometry>(value: T): T => { geometries.add(value); return value; };
    const material = <T extends THREE.Material>(value: T): T => { materials.add(value); return value; };
    const metal = material(new THREE.MeshStandardMaterial({ color: 0x20282c, roughness: 0.42, metalness: 0.72 }));
    const dark = material(new THREE.MeshStandardMaterial({ color: 0x10171c, roughness: 0.74, metalness: 0.26 }));
    const stone = material(new THREE.MeshStandardMaterial({ color: 0x343b3f, roughness: 0.91, metalness: 0.08 }));
    const white = material(new THREE.MeshStandardMaterial({ color: 0x68716d, roughness: 0.5, metalness: 0.42 }));
    const glass = material(new THREE.MeshStandardMaterial({ color: 0x668d94, transparent: true, opacity: 0.12, roughness: 0.18, metalness: 0.6, side: THREE.DoubleSide, depthWrite: false }));
    const light = material(new THREE.MeshBasicMaterial({ color: 0xa5d4db }));
    const warmLight = material(new THREE.MeshBasicMaterial({ color: 0xd5b88f }));
    const accents = [0x88b7c1, 0xa9b99a, 0x9eadd0, 0x9dbfbd, 0xc3b398];
    const cube = geometry(new THREE.BoxGeometry(1, 1, 1));
    const cylinder = geometry(new THREE.CylinderGeometry(1, 1, 1, 24));
    const sphere = geometry(new THREE.SphereGeometry(1, 14, 10));

    function box(parent: THREE.Object3D, x: number, y: number, z: number, sx: number, sy: number, sz: number, mat: THREE.Material = metal) {
      const mesh = new THREE.Mesh(cube, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      parent.add(mesh);
      return mesh;
    }
    function rod(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, radius = 0.024, mat: THREE.Material = light) {
      const mesh = new THREE.Mesh(cylinder, mat);
      mesh.position.copy(a).add(b).multiplyScalar(0.5);
      mesh.scale.set(radius, a.distanceTo(b), radius);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
      parent.add(mesh);
    }
    function ring(parent: THREE.Object3D, radius: number, tube: number, mat: THREE.Material, x: number, y: number, z: number) {
      const mesh = new THREE.Mesh(geometry(new THREE.TorusGeometry(radius, tube, 8, 52)), mat);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    }

    // Emissive monitor surfaces are drawn locally; there are no remote assets or data.
    function screenTexture(kind: number, accent: string) {
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#081318'; ctx.fillRect(0, 0, 512, 300);
      ctx.strokeStyle = '#1c333b'; ctx.lineWidth = 1;
      for (let x = 24; x < 512; x += 32) { ctx.beginPath(); ctx.moveTo(x, 38); ctx.lineTo(x, 280); ctx.stroke(); }
      for (let y = 44; y < 300; y += 26) { ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(492, y); ctx.stroke(); }
      ctx.fillStyle = accent; ctx.fillRect(22, 18, 84, 3);
      ctx.fillStyle = '#425c63'; ctx.fillRect(388, 18, 103, 3);
      ctx.strokeStyle = accent; ctx.lineWidth = 2;
      if (kind % 3 === 0) {
        for (let row = 0; row < 4; row++) {
          ctx.beginPath();
          for (let x = 24; x < 490; x += 4) {
            const y = 78 + row * 53 + Math.sin(x * 0.054 + row * 2) * 8 + Math.sin(x * 0.13 + kind) * 4;
            if (x === 24) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (kind % 3 === 1) {
        const points = [[95, 145], [210, 90], [210, 210], [355, 130], [421, 232]];
        for (let i = 0; i < points.length - 1; i++) {
          ctx.beginPath(); ctx.moveTo(...points[i] as [number, number]); ctx.lineTo(...points[i + 1] as [number, number]); ctx.stroke();
        }
        for (const [x, y] of points) { ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.stroke(); }
      } else {
        for (let i = 0; i < 11; i++) {
          ctx.globalAlpha = 0.4 + (i % 3) * 0.2;
          ctx.fillStyle = accent;
          ctx.fillRect(30 + i * 42, 260 - (40 + (i * 37) % 160), 24, 40 + (i * 37) % 160);
        }
        ctx.globalAlpha = 1;
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.add(texture);
      return texture;
    }
    function monitor(parent: THREE.Object3D, x: number, y: number, z: number, kind: number, accent: string, width = 2.2) {
      box(parent, x, y, z, width + 0.13, width * 0.59 + 0.13, 0.14, dark);
      const map = screenTexture(kind, accent);
      const mat = material(new THREE.MeshBasicMaterial({ map, color: map ? 0xffffff : 0x294650 }));
      box(parent, x, y, z + 0.079, width, width * 0.59, 0.012, mat);
      box(parent, x, y - width * 0.43, z, 0.11, width * 0.3, 0.12);
      box(parent, x, y - width * 0.58, z + 0.1, 0.7, 0.05, 0.42);
    }
    function rack(parent: THREE.Object3D, x: number, z: number, accent: THREE.Material) {
      box(parent, x, 1.6, z, 1.08, 3.2, 0.95, dark);
      box(parent, x - 0.52, 1.6, z + 0.5, 0.035, 3.15, 0.06, white);
      box(parent, x + 0.52, 1.6, z + 0.5, 0.035, 3.15, 0.06, white);
      for (let row = 0; row < 10; row++) {
        box(parent, x, 0.25 + row * 0.29, z + 0.5, 0.94, 0.22, 0.04);
        box(parent, x + 0.35, 0.25 + row * 0.29, z + 0.527, 0.055, 0.032, 0.025, accent);
        for (let slot = 0; slot < 4; slot++) box(parent, x - 0.32 + slot * 0.13, 0.25 + row * 0.29, z + 0.525, 0.05, 0.09, 0.014, dark);
      }
    }

    scene.add(new THREE.HemisphereLight(0x8ba5b9, 0x161a18, 1.8));
    const mainLight = new THREE.DirectionalLight(0xbed1db, 2.5);
    mainLight.position.set(-6, 11, 8); scene.add(mainLight);
    const fill = new THREE.DirectionalLight(0xc2a98b, 0.75);
    fill.position.set(8, 4, -26); scene.add(fill);
    box(scene, 0, -0.18, -35, 32, 0.3, 98, stone);
    // Floor seams and a continuous illuminated service channel connect the rooms.
    for (let z = 10; z > -86; z -= 3) box(scene, 0, -0.017, z, 30, 0.012, 0.025, dark);
    for (let x = -15; x <= 15; x += 3) box(scene, x, -0.016, -35, 0.025, 0.012, 95, dark);
    box(scene, 0, -0.005, -34, 0.8, 0.015, 92, dark);
    box(scene, -0.32, 0.008, -34, 0.018, 0.012, 92, light);
    box(scene, 0.32, 0.008, -34, 0.018, 0.012, 92, light);

    const kinetic: THREE.Object3D[] = [];
    for (let index = 0; index < 5; index++) {
      const room = new THREE.Group();
      room.position.z = -index * 17;
      scene.add(room);
      const accent = material(new THREE.MeshBasicMaterial({ color: accents[index] }));
      const accentHex = `#${accents[index].toString(16)}`;
      // Exposed beams, frosted dividers and practical strip fixtures.
      box(room, -10.2, 3.2, -2, 0.24, 6.4, 12);
      box(room, 10.2, 3.2, -2, 0.24, 6.4, 12);
      box(room, 0, 6.45, -5.5, 20.6, 0.24, 0.38);
      box(room, 0, 6.45, 3.5, 20.6, 0.24, 0.38);
      box(room, -4.6, 6.35, -1.2, 0.12, 0.08, 7.6, light);
      box(room, 4.6, 6.35, -1.2, 0.12, 0.08, 7.6, warmLight);
      box(room, -7.4, 2.1, -5.8, 5.2, 4.2, 0.04, glass);
      box(room, 7.4, 2.1, -5.8, 5.2, 4.2, 0.04, glass);
      box(room, -7.4, 4.22, -5.8, 5.3, 0.05, 0.08, metal);
      box(room, 7.4, 4.22, -5.8, 5.3, 0.05, 0.08, metal);
      const practical = new THREE.PointLight(accents[index], 32, 15, 2);
      practical.position.set(1, 4.8, -1); room.add(practical);
      // A substantial working desk stays consistent across the connected spaces.
      box(room, -4.8, 1.32, 0.2, 5.7, 0.12, 1.8, white);
      box(room, -7.25, 0.65, 0.2, 0.13, 1.3, 1.45);
      box(room, -2.35, 0.65, 0.2, 0.13, 1.3, 1.45);
      monitor(room, -5.95, 2.35, -0.18, index, accentHex);
      monitor(room, -3.48, 2.35, -0.18, index + 1, accentHex);
      box(room, -5.2, 1.4, 0.64, 1.3, 0.035, 0.38, dark);
      box(room, -3.7, 1.4, 0.65, 0.2, 0.06, 0.3, dark);
      // Empty chair; the user's real portrait is never substituted by a fake person.
      box(room, -4.8, 0.85, 2.15, 1.1, 0.14, 1.05, dark);
      box(room, -4.8, 1.45, 2.57, 1.02, 1.2, 0.13, dark);
      box(room, -4.8, 0.4, 2.15, 0.1, 0.8, 0.1);
      box(room, -4.8, 0.1, 2.15, 1.3, 0.08, 0.12);
      box(room, -4.8, 0.1, 2.15, 0.12, 0.08, 1.3);
      rack(room, -8.8, -3.8, accent);
      rack(room, 8.65, -4.4, accent);
      // Five different physical security systems, all decorative and unlabeled.
      if (index === 0) {
        box(room, 4.8, 0.35, -1, 4.6, 0.7, 3.6, dark);
        for (const x of [3.25, 6.35]) {
          box(room, x, 2.35, -1, 0.5, 3.3, 0.7);
          box(room, x - 0.27, 2.35, -0.62, 0.06, 2.9, 0.04, accent);
        }
        box(room, 4.8, 4.05, -1, 3.6, 0.3, 0.7);
        box(room, 4.8, 2.32, -1, 2.7, 3.05, 0.04, glass);
        for (let n = 0; n < 6; n++) box(room, 4.8, 1.1 + n * 0.46, -0.92, 2.65, 0.025, 0.018, accent);
        monitor(room, 5, 2.6, -4.2, 0, accentHex, 4.2);
      } else if (index === 1) {
        box(room, 4.9, 0.55, -0.8, 5, 1.1, 3.8, dark);
        const positions = [[4.7, 3.8, -0.8], [3.2, 2.3, -0.3], [6.5, 2.45, -0.5], [4.3, 1.7, 0.5], [5.8, 3.1, -2.2], [3.1, 3.1, -2.2]];
        const nodes = positions.map(p => new THREE.Vector3(...p as [number, number, number]));
        for (let i = 0; i < nodes.length; i++) {
          const node = new THREE.Mesh(sphere, i === 0 ? accent : white);
          node.position.copy(nodes[i]); node.scale.setScalar(i === 0 ? 0.24 : 0.15); room.add(node);
          if (i > 0) rod(room, nodes[0], nodes[i], 0.017, accent);
          if (i > 1) rod(room, nodes[i - 1], nodes[i], 0.012, metal);
        }
        ring(room, 1.85, 0.017, accent, 4.8, 2.85, -2.45);
      } else if (index === 2) {
        box(room, 4.8, 1.1, -0.8, 4.7, 0.22, 3.4, white);
        for (const x of [2.8, 6.8]) box(room, x, 0.5, -0.8, 0.15, 1, 2.8);
        box(room, 4.8, 2.35, -0.8, 3.3, 2.25, 2.3, glass);
        const specimen = new THREE.Group(); specimen.position.set(4.8, 2.35, -0.8); room.add(specimen);
        const mesh = new THREE.Mesh(geometry(new THREE.IcosahedronGeometry(0.85, 0)), metal); specimen.add(mesh);
        const edges = new THREE.LineSegments(geometry(new THREE.EdgesGeometry(mesh.geometry)), material(new THREE.LineBasicMaterial({ color: accents[index] })));
        specimen.add(edges); kinetic.push(specimen);
        ring(room, 1.2, 0.028, accent, 4.8, 2.35, -0.8);
        box(room, 4.8, 3.65, -0.8, 3.6, 0.12, 2.6);
        box(room, 4.8, 3.54, -0.8, 2.8, 0.035, 0.12, light);
      } else if (index === 3) {
        for (let row = 0; row < 2; row++) for (let col = 0; col < 3; col++) {
          monitor(room, 2.7 + col * 2.3, 2.1 + row * 1.6, -2.8, row + col, accentHex, 2.1);
        }
        box(room, 5, 1.05, -1.6, 7.3, 0.15, 1.4, metal);
      } else {
        box(room, 4.8, 1.1, -0.5, 5.2, 0.15, 3.8, white);
        box(room, 2.6, 0.5, -0.5, 0.2, 1, 3);
        box(room, 7, 0.5, -0.5, 0.2, 1, 3);
        for (let i = 0; i < 6; i++) {
          box(room, 3.1 + i * 0.65, 1.5 + (i % 3) * 0.17, -0.3, 0.4, 0.7 + (i % 3) * 0.34, 0.7, metal);
          box(room, 3.1 + i * 0.65, 1.88 + (i % 3) * 0.34, -0.3, 0.4, 0.025, 0.7, accent);
        }
        monitor(room, 4.8, 3.1, -3.5, 2, accentHex, 4.8);
      }
    }

    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(11, 5.6, 12), new THREE.Vector3(6.8, 4, 5),
      new THREE.Vector3(-0.8, 3.4, -10), new THREE.Vector3(8.1, 4.1, -25),
      new THREE.Vector3(0.5, 3.7, -42), new THREE.Vector3(8, 4.5, -57),
    ], false, 'catmullrom', 0.22);
    const lookPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.2, -2), new THREE.Vector3(2, 2.1, -3),
      new THREE.Vector3(2.2, 2.1, -19), new THREE.Vector3(0.6, 2.2, -36),
      new THREE.Vector3(2.5, 2.2, -53), new THREE.Vector3(0.8, 2.1, -69),
    ]);
    let stopped = false;
    let inView = true;
    let frame = 0;
    let progress = 0;
    let current = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastTime = 0;
    let drawn = false;
    const lookAt = new THREE.Vector3();
    const position = new THREE.Vector3();
    function readProgress() {
      progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
      requestFrame();
    }
    function requestFrame() {
      if (!frame && !stopped && inView && !document.hidden) frame = requestAnimationFrame(draw);
    }
    function draw(time: number) {
      frame = 0;
      if (stopped || !inView || document.hidden) return;
      const dt = Math.min((time - lastTime) / 1000 || 0.016, 0.05);
      lastTime = time;
      current = motion.matches ? 0 : current + (progress - current) * (1 - Math.exp(-dt * 5));
      cameraPath.getPoint(current, position);
      lookPath.getPoint(current, lookAt);
      if (!motion.matches) { position.x += pointerX * 0.16; position.y += pointerY * 0.08; }
      camera.position.copy(position); camera.lookAt(lookAt);
      if (!motion.matches) for (const object of kinetic) object.rotation.y += dt * 0.1;
      renderer.render(scene, camera);
      if (!drawn) { renderer.domElement.style.opacity = '1'; drawn = true; }
      if (!motion.matches && Math.abs(progress - current) > 0.0001) requestFrame();
    }
    function resize() {
      const width = host!.clientWidth;
      const height = host!.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height; camera.updateProjectionMatrix();
      requestFrame();
    }
    function pointer(event: PointerEvent) {
      if (motion.matches || event.pointerType !== 'mouse') return;
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      requestFrame();
    }
    function visibility() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else { lastTime = 0; requestFrame(); }
    }
    function lost(event: Event) {
      event.preventDefault(); stopped = true; cancelAnimationFrame(frame); frame = 0;
      renderer.domElement.style.opacity = '0';
    }
    function changedMotion() { requestFrame(); }
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) requestFrame(); else { cancelAnimationFrame(frame); frame = 0; }
    });
    visibilityObserver.observe(host);
    window.addEventListener('scroll', readProgress, { passive: true });
    window.addEventListener('pointermove', pointer, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    renderer.domElement.addEventListener('webglcontextlost', lost);
    motion.addEventListener('change', changedMotion);
    resize(); readProgress();
    return () => {
      stopped = true; cancelAnimationFrame(frame);
      observer.disconnect(); visibilityObserver.disconnect();
      window.removeEventListener('scroll', readProgress);
      window.removeEventListener('pointermove', pointer);
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      motion.removeEventListener('change', changedMotion);
      geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose()); textures.forEach(item => item.dispose());
      renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className={`trust-scene ${className}`} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', background: 'radial-gradient(ellipse at 70% 35%, #1b2e35 0%, #0a1117 52%, #060b0f 100%)' }} />;
}
