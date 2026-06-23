import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

interface Project {
  title: string
  description: string
  longDesc: string
  tags: string[]
  gradient: string
  accent: string
  emoji: string
  github: string
  live: string
}

const projects: Project[] = [
  {
    title: 'Fashion Stylist AI',
    description: 'AI-powered outfit recommendation platform',
    longDesc: 'An intelligent platform that analyses body type and skin tone to suggest personalised outfit combinations. Built with a React frontend, Node.js API, and an ML inference layer for style matching.',
    tags: ['React', 'Node.js', 'Python', 'Machine Learning', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #6C63FF22 0%, #A78BFA11 100%)',
    accent: '#6C63FF',
    emoji: '👗',
    github: 'https://github.com/GITHUB_USERNAME/fashion-stylist',
    live: 'https://YOUR_LIVE_URL',
  },
  {
    title: 'Smart Wardrobe Assistant',
    description: 'Intelligent wardrobe management app',
    longDesc: 'A modern wardrobe management application that catalogues clothing items and generates personalised outfit suggestions based on weather, occasion, and personal preferences.',
    tags: ['React', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #A78BFA22 0%, #818CF811 100%)',
    accent: '#A78BFA',
    emoji: '🪞',
    github: 'https://github.com/GITHUB_USERNAME/smart-wardrobe',
    live: 'https://YOUR_LIVE_URL',
  },
  {
    title: 'Internship Management System',
    description: 'Full-stack platform for internship operations',
    longDesc: 'A comprehensive platform that manages the complete internship lifecycle — student applications, company listings, mentor assignments, and progress tracking — with role-based access control.',
    tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'JWT'],
    gradient: 'linear-gradient(135deg, #818CF822 0%, #6C63FF11 100%)',
    accent: '#818CF8',
    emoji: '🏢',
    github: 'https://github.com/GITHUB_USERNAME/internship-management',
    live: 'https://YOUR_LIVE_URL',
  },
  {
    title: 'Smart Home Gardening System',
    description: 'IoT-based plant monitoring system',
    longDesc: 'An IoT platform that monitors soil moisture, light levels, and temperature using sensors, then automates watering schedules and sends alerts — with a real-time dashboard built in React.',
    tags: ['IoT', 'Python', 'React', 'MQTT', 'Node.js'],
    gradient: 'linear-gradient(135deg, #10B98122 0%, #6C63FF11 100%)',
    accent: '#34D399',
    emoji: '🌱',
    github: 'https://github.com/GITHUB_USERNAME/smart-garden',
    live: 'https://YOUR_LIVE_URL',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: hovered ? project.gradient : 'rgba(20,24,41,0.7)',
        border: `1px solid ${hovered ? project.accent + '40' : '#1E2440'}`,
        boxShadow: hovered ? `0 8px 40px ${project.accent}20` : 'none',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Image placeholder */}
      <div
        className="h-44 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}08)` }}
      >
        <span className="text-7xl opacity-60 select-none">{project.emoji}</span>
        {/* Replace this div with an <img> tag pointing to your project screenshot */}
        <div className="absolute bottom-2 right-2 text-[9px] font-mono opacity-30 text-[#8892B0]">
          PROJECT_IMAGE_PLACEHOLDER
        </div>

        {/* Overlay links on hover */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center gap-4"
          style={{ background: 'rgba(8,11,20,0.6)' }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass hover:bg-[#6C63FF33] transition-colors"
            onClick={e => e.stopPropagation()}
            aria-label="GitHub repository"
          >
            <Github size={18} className="text-[#F0EFFF]" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass hover:bg-[#6C63FF33] transition-colors"
            onClick={e => e.stopPropagation()}
            aria-label="Live demo"
          >
            <ExternalLink size={18} className="text-[#F0EFFF]" />
          </a>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-semibold text-[#F0EFFF] text-lg leading-tight">{project.title}</h3>
          <motion.div
            animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={18} style={{ color: project.accent }} className="opacity-60 mt-0.5" />
          </motion.div>
        </div>
        <p className="text-[#A78BFA] text-xs font-display mb-3">{project.description}</p>
        <p className="text-[#8892B0] text-sm leading-relaxed mb-4">{project.longDesc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-display font-medium px-2.5 py-1 rounded-full"
              style={{
                background: `${project.accent}12`,
                color: project.accent,
                border: `1px solid ${project.accent}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section id="projects" ref={sectionRef} className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">Projects</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F0EFFF] mt-4">
            Things I've built
          </h2>
          <p className="text-[#8892B0] mt-4 max-w-lg mx-auto">
            A selection of projects across web development, AI/ML, and IoT — each one built to solve a real problem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/GITHUB_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
