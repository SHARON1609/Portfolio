import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Skill {
  name: string
  level: number // 0-100
  icon: string
}

interface Category {
  label: string
  color: string
  skills: Skill[]
}

const categories: Category[] = [
  {
    label: 'Languages',
    color: '#6C63FF',
    skills: [
      { name: 'Java', level: 85, icon: '☕' },
      { name: 'Python', level: 75, icon: '🐍' },
      { name: 'JavaScript', level: 80, icon: '🟨' },
      { name: 'TypeScript', level: 70, icon: '🔷' },
      { name: 'SQL', level: 78, icon: '🗃️' },
    ]
  },
  {
    label: 'Frontend',
    color: '#A78BFA',
    skills: [
      { name: 'React.js', level: 82, icon: '⚛️' },
      { name: 'HTML5', level: 90, icon: '🌐' },
      { name: 'CSS3', level: 85, icon: '🎨' },
      { name: 'Tailwind CSS', level: 80, icon: '🌊' },
      { name: 'Redux', level: 65, icon: '🔄' },
    ]
  },
  {
    label: 'Backend',
    color: '#818CF8',
    skills: [
      { name: 'Node.js', level: 78, icon: '🟢' },
      { name: 'Express.js', level: 75, icon: '⚡' },
      { name: 'Spring Boot', level: 70, icon: '🍃' },
    ]
  },
  {
    label: 'Database',
    color: '#C4B5FD',
    skills: [
      { name: 'PostgreSQL', level: 75, icon: '🐘' },
      { name: 'MySQL', level: 72, icon: '🐬' },
      { name: 'MongoDB', level: 65, icon: '🍃' },
    ]
  },
  {
    label: 'Tools',
    color: '#7C3AED',
    skills: [
      { name: 'Git', level: 82, icon: '🔀' },
      { name: 'GitHub', level: 85, icon: '🐙' },
      { name: 'Postman', level: 78, icon: '📮' },
      { name: 'VS Code', level: 90, icon: '💙' },
    ]
  },
  {
    label: 'Concepts',
    color: '#8B5CF6',
    skills: [
      { name: 'Data Structures', level: 80, icon: '📊' },
      { name: 'Algorithms', level: 75, icon: '🧮' },
      { name: 'OOP', level: 85, icon: '🎯' },
      { name: 'REST APIs', level: 82, icon: '🔗' },
      { name: 'DBMS', level: 75, icon: '💾' },
      { name: 'OS', level: 68, icon: '🖥️' },
    ]
  },
]

function SkillCard({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass rounded-xl p-4 cursor-default transition-all duration-300 group"
      style={{
        border: hovered ? `1px solid ${color}40` : '1px solid rgba(30,36,64,1)',
        boxShadow: hovered ? `0 4px 24px ${color}20` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl">{skill.icon}</span>
        <span className="font-display text-sm font-medium text-[#F0EFFF]">{skill.name}</span>
      </div>
      {/* Progress bar */}
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        />
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-[10px] font-mono" style={{ color: `${color}99` }}>{skill.level}%</span>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section id="skills" ref={sectionRef} className="py-28 relative" style={{ background: 'rgba(15,18,33,0.5)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">Skills</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F0EFFF] mt-4">
            Tech I work with
          </h2>
          <p className="text-[#8892B0] mt-4 max-w-lg mx-auto">
            A spectrum of tools and technologies I've used in academic projects, internships, and personal builds.
          </p>
        </motion.div>

        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-display font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ color: cat.color, background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                >
                  {cat.label}
                </span>
                <div className="flex-1 h-px opacity-20" style={{ background: cat.color }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {cat.skills.map((skill, si) => (
                  <SkillCard key={skill.name} skill={skill} color={cat.color} index={si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
