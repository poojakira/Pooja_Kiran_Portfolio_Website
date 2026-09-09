"use client";

import { useEffect, useRef, useState } from "react";
import type { ArchitectureFlow as Flow } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ArchitectureFlow — a precise, animated diagram of a project's real control
 * flow. The security boundary (boundaryIndex) is drawn as a distinct gate, and
 * a data packet travels the pipeline. Not decorative: the node labels come
 * straight from each repository's actual architecture.
 */
export default function ArchitectureFlow({
  flow,
  accent = "#5BC8D6",
}: {
  flow: Flow;
  accent?: string;
}) {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  const raf = useRef(0);
  const { nodes, boundaryIndex } = flow;

  useEffect(() => {
    if (reduced) return;
    let start = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - start) / 2600; // ~2.6s per traversal
      setT(elapsed % 1);
      if (elapsed >= 1) start = now;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [reduced]);

  const n = nodes.length;
  const pad = 8;
  const usable = 100 - pad * 2;
  const step = n > 1 ? usable / (n - 1) : 0;
  const xs = nodes.map((_, i) => pad + i * step);
  const y = 50;

  // packet position along the polyline (0..1 across whole flow)
  const packetSeg = t * (n - 1);
  const segIndex = Math.min(Math.floor(packetSeg), n - 2);
  const segFrac = packetSeg - segIndex;
  const packetX = xs[segIndex] + (xs[segIndex + 1] - xs[segIndex]) * segFrac;

  // Is the packet currently at/after the boundary gate?
  const inspected = packetSeg >= boundaryIndex;

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 100 100"
        className="h-40 w-full"
        role="img"
        aria-label={`Architecture flow: ${nodes.join(" then ")}. Security boundary at ${nodes[boundaryIndex]}.`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* connective line */}
        {xs.slice(0, -1).map((x, i) => (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={xs[i + 1]}
            y2={y}
            stroke="#25282E"
            strokeWidth={0.6}
          />
        ))}

        {/* boundary gate — the security perimeter */}
        {boundaryIndex >= 0 && boundaryIndex < n && (
          <g>
            <line
              x1={xs[boundaryIndex]}
              y1={y - 20}
              x2={xs[boundaryIndex]}
              y2={y + 20}
              stroke={accent}
              strokeWidth={0.5}
              strokeDasharray="1.6 1.6"
              opacity={0.8}
            />
            <text
              x={xs[boundaryIndex]}
              y={y - 24}
              textAnchor="middle"
              className="fill-signal font-mono"
              style={{ fontSize: 3 }}
            >
              BOUNDARY
            </text>
          </g>
        )}

        {/* nodes */}
        {nodes.map((label, i) => {
          const isBoundary = i === boundaryIndex;
          return (
            <g key={label}>
              <circle
                cx={xs[i]}
                cy={y}
                r={isBoundary ? 3.4 : 2.6}
                fill={isBoundary ? "#121316" : "#1A1C20"}
                stroke={isBoundary ? accent : "#3A3D44"}
                strokeWidth={isBoundary ? 0.8 : 0.5}
              />
              <text
                x={xs[i]}
                y={y + 12}
                textAnchor="middle"
                className="fill-mist font-mono"
                style={{ fontSize: 3 }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* traveling packet */}
        {!reduced && (
          <circle
            cx={packetX}
            cy={y}
            r={1.5}
            fill={inspected ? accent : "#A8ACB4"}
            opacity={0.95}
          />
        )}
      </svg>
      <p className="mt-1 text-center font-mono text-fluid-xs text-ash">
        request{" "}
        <span className={inspected ? "text-signal" : "text-mist"}>
          {inspected ? "inspected → allowed / blocked" : "entering the boundary"}
        </span>
      </p>
    </div>
  );
}
