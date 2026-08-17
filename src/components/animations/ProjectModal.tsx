'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Project, getDomainById } from '@/lib/content';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isOpen: boolean;
}

export default function ProjectModal({ project, onClose, isOpen }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClose = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
      timelineRef.current.eventCallback('onReverseComplete', () => {
        onClose();
      });
    } else {
      onClose();
    }
  }, [onClose]);

  // Lock body scroll and manage focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      // Focus the close button after animation
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // GSAP animation
  useEffect(() => {
    if (!isOpen || !overlayRef.current || !contentRef.current) return;

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
      .fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      );

    // Stagger child elements
    const children = contentRef.current.querySelectorAll('[data-animate]');
    if (children.length > 0) {
      tl.fromTo(
        children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const domain = getDomainById(project.domain);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50"
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6" onClick={handleOverlayClick}>
        <div
          ref={contentRef}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-graphite border border-sentinel-violet/30 shadow-2xl shadow-sentinel-violet/10 p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-silver-haze hover:text-pure-light hover:bg-white/10 transition-colors focus-visible-ring"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Domain badge */}
          <div data-animate className="flex items-center gap-2 mb-4">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: domain?.color ?? '#8B5CF6' }}
              aria-hidden="true"
            />
            <span
              className="text-sm font-mono px-3 py-1 rounded-full border"
              style={{
                color: domain?.color ?? '#8B5CF6',
                borderColor: `${domain?.color ?? '#8B5CF6'}33`,
                backgroundColor: `${domain?.color ?? '#8B5CF6'}10`,
              }}
            >
              {domain?.name ?? 'Security'}
            </span>
          </div>

          {/* Title */}
          <h2
            id="modal-title"
            data-animate
            className="text-fluid-3xl font-satoshi font-bold text-pure-light mb-4 pr-12"
          >
            {project.title}
          </h2>

          {/* Full description */}
          <p data-animate className="text-silver-haze text-fluid-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech tags */}
          <div data-animate className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1.5 rounded-lg bg-white/5 text-silver-haze border border-white/10 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Related info */}
          <div data-animate className="border-t border-white/10 pt-6 mb-6">
            <h3 className="text-sm font-mono text-whisper uppercase tracking-widest mb-3">
              Project Details
            </h3>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-whisper mb-1">Domain</dt>
                <dd className="text-pure-light">{domain?.name ?? 'Unknown'}</dd>
              </div>
              <div>
                <dt className="text-whisper mb-1">Category</dt>
                <dd className="text-pure-light">{project.featured ? 'Featured Project' : 'Research Project'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-whisper mb-1">Domain Focus</dt>
                <dd className="text-silver-haze text-sm leading-relaxed">{domain?.description ?? ''}</dd>
              </div>
            </dl>
          </div>

          {/* GitHub link button */}
          <div data-animate>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-sentinel-violet/20 border border-sentinel-violet/40 text-pure-light hover:bg-sentinel-violet/30 hover:border-sentinel-violet/60 transition-all duration-300 font-medium focus-visible-ring"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
