'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

export default function EasterEggs() {
  const [showMatrixRain, setShowMatrixRain] = useState(false);

  // Console message on mount
  useEffect(() => {
    console.log(
      `%c███████ GUARDIAN PROTOCOL ███████`,
      'color: #8B5CF6; font-size: 16px; font-weight: bold;'
    );
    console.log(
      `%cDesigned & engineered by Pooja Kiran Bharadwaj`,
      'color: #06B6D4; font-size: 12px;'
    );
    console.log(
      `%c\nLooking at the source? Good instinct.\nThat's exactly the kind of curiosity I bring to security.\n\n🔒 poojakiranbhardwaj@gmail.com`,
      'color: #94A3B8; font-size: 11px;'
    );
  }, []);

  // Konami code listener
  const handleKonami = useCallback(() => {
    setShowMatrixRain(true);
    setTimeout(() => setShowMatrixRain(false), 3000);
  }, []);

  useEffect(() => {
    let inputSequence: string[] = [];

    function handleKeyDown(e: KeyboardEvent) {
      inputSequence.push(e.code);

      // Keep only the last N keys (length of konami code)
      if (inputSequence.length > KONAMI_CODE.length) {
        inputSequence = inputSequence.slice(-KONAMI_CODE.length);
      }

      // Check if the sequence matches
      if (
        inputSequence.length === KONAMI_CODE.length &&
        inputSequence.every((key, i) => key === KONAMI_CODE[i])
      ) {
        handleKonami();
        inputSequence = [];
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKonami]);

  if (!showMatrixRain) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none animate-matrix-fade"
      aria-hidden="true"
    >
      <div className="matrix-rain" />
      <style jsx>{`
        .matrix-rain {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 255, 65, 0.03) 50%,
            transparent 100%
          );
          overflow: hidden;
        }
        .matrix-rain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.08) 2px,
            rgba(0, 255, 65, 0.08) 4px
          );
          animation: matrix-scroll 0.5s linear infinite;
        }
        .matrix-rain::after {
          content: '01001000 01100001 01100011 01101011 00100000 01110100 01101000 01100101 00100000 01110000 01101100 01100001 01101110 01100101 01110100';
          position: absolute;
          inset: 0;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          color: rgba(0, 255, 65, 0.4);
          word-break: break-all;
          line-height: 1.5;
          padding: 20px;
          animation: matrix-fade-text 3s ease-in-out;
          overflow: hidden;
        }
        @keyframes matrix-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes matrix-fade-text {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
