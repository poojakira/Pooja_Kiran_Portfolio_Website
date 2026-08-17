'use client';

import { useState } from 'react';
import { projects, getDomainById, type Project } from '@/lib/content';
import ProjectModal from '@/components/animations/ProjectModal';

export default function ProjectsInteractive() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-plasma-cyan font-mono text-sm tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-fluid-4xl font-satoshi font-bold text-pure-light mb-4">
            Projects
          </h2>
          <p className="text-silver-haze text-fluid-base max-w-2xl">
            13 open-source security tools, frameworks, and research
            implementations. Each project targets a specific threat vector in the
            AI security landscape.
          </p>
        </div>

        {/* Featured projects */}
        <div className="mb-16">
          <h3 className="text-sm font-mono text-sentinel-violet uppercase tracking-widest mb-6">
            {'//'} Featured
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleCardClick(project)}
                variant="featured"
              />
            ))}
          </div>
        </div>

        {/* Other projects */}
        <div>
          <h3 className="text-sm font-mono text-plasma-cyan uppercase tracking-widest mb-6">
            {'//'} All Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {other.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleCardClick(project)}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

// --- Project Card Component ---

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  variant: 'featured' | 'compact';
}

function ProjectCard({ project, onClick, variant }: ProjectCardProps) {
  const domain = getDomainById(project.domain);

  if (variant === 'featured') {
    return (
      <button
        onClick={onClick}
        className="group relative p-6 rounded-2xl bg-graphite/60 border border-sentinel-violet/20 hover:border-sentinel-violet/40 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-lg hover:shadow-sentinel-violet/5 focus-visible-ring"
        aria-label={`View details for ${project.title}`}
      >
        {/* Click to expand indicator */}
        <span className="absolute top-4 right-4 text-[10px] font-mono text-whisper/0 group-hover:text-whisper/70 transition-all duration-300 bg-white/5 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
          Click to expand
        </span>

        {/* Domain badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: domain?.color }}
            aria-hidden="true"
          />
          <span className="text-xs font-mono text-whisper">
            {domain?.name}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-satoshi font-semibold text-lg text-pure-light mb-3 group-hover:text-sentinel-violet transition-colors">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-silver-haze leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-white/5 text-silver-haze border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand indicator */}
        <div className="flex items-center gap-2 text-xs text-whisper group-hover:text-plasma-cyan transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>View details →</span>
        </div>
      </button>
    );
  }

  // Compact variant
  return (
    <button
      onClick={onClick}
      className="group p-5 rounded-xl bg-graphite/30 border border-white/5 hover:border-white/10 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-md hover:shadow-sentinel-violet/5 focus-visible-ring"
      aria-label={`View details for ${project.title}`}
    >
      {/* Domain indicator + title */}
      <div className="flex items-start gap-3 mb-2">
        <span
          className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: domain?.color }}
          aria-hidden="true"
        />
        <h4 className="font-satoshi font-medium text-pure-light text-sm group-hover:text-plasma-cyan transition-colors">
          {project.title}
        </h4>
      </div>

      {/* Short description */}
      <p className="text-xs text-whisper leading-relaxed ml-5 line-clamp-2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3 ml-5">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-silver-haze/70"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover indicator */}
      <span className="block mt-3 ml-5 text-[10px] font-mono text-whisper/0 group-hover:text-whisper/60 transition-all duration-300 opacity-0 group-hover:opacity-100">
        Click to expand ↗
      </span>
    </button>
  );
}
