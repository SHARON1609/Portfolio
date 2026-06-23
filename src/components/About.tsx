import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Briefcase, Target } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    institution: 'SNS College of Technology, Coimbatore',
    period: '2023 – 2027',
    detail: 'Focused on full-stack development, data structures, algorithms, and machine learning fundamentals.',
  },
]

const experience = [
  {
    role: 'Software Development Intern',
    company: 'DaacoWorks Technologies',
    period: '2024',
    points: [
      'Built and maintained full-stack web application features using React and Node.js',
      'Collaborated on REST API design and PostgreSQL schema optimization',
      'Participated in code reviews and agile sprint cycles',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Accent Techno Soft',
    period: '2024',
    points: [
      'Developed Java-based backend modules integrated with Spring Boot',
      'Worked on frontend UI components and improved responsiveness',
      'Contributed to internal tooling and documentation',
    ],
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section id="about" ref={sectionRef} className="py-28 relative">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 opacity-30"
        style={{ background: 'linear-gradient(to bottom, transparent, #6C63FF)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">About</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F0EFFF] mt-4">
            The person behind the code
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Summary */}
          <div>
            <AnimatedSection>
              <p className="text-[#8892B0] text-lg leading-relaxed mb-4">
                I'm a final-year Computer Science student with a genuine curiosity for how things
                work — from database indexes to UI micro-interactions. I've shipped projects that
                blend backend logic, clean APIs, and polished interfaces.
              </p>
              <p className="text-[#8892B0] text-base leading-relaxed mb-8">
                My internship experience spans product development at early-stage companies where
                I wore multiple hats — writing Java services in the morning and debugging React
                components in the afternoon. I thrive in environments that reward ownership.
              </p>
            </AnimatedSection>

            {/* Career objective */}
            <AnimatedSection>
              <div className="glass rounded-2xl p-6 border border-[#6C63FF22]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(108,99,255,0.15)' }}>
                    <Target size={16} className="text-[#6C63FF]" />
                  </div>
                  <h3 className="font-display font-semibold text-[#F0EFFF]">Career Objective</h3>
                </div>
                <p className="text-[#8892B0] text-sm leading-relaxed">
                  Seeking a Software Engineer role at a product-focused company where I can contribute
                  to building scalable systems, learn from experienced engineers, and grow towards
                  a full-stack engineering career.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {/* Education */}
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(108,99,255,0.15)' }}>
                  <GraduationCap size={16} className="text-[#6C63FF]" />
                </div>
                <h3 className="font-display font-semibold text-[#F0EFFF]">Education</h3>
              </div>
              {education.map(ed => (
                <div key={ed.degree} className="glass rounded-2xl p-5 border-l-2 border-[#6C63FF]">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4 className="font-display font-semibold text-[#F0EFFF] text-sm leading-snug">{ed.degree}</h4>
                    <span className="text-xs text-[#6C63FF] font-mono whitespace-nowrap mt-0.5">{ed.period}</span>
                  </div>
                  <p className="text-[#A78BFA] text-xs mb-2">{ed.institution}</p>
                  <p className="text-[#8892B0] text-xs leading-relaxed">{ed.detail}</p>
                </div>
              ))}
            </AnimatedSection>

            {/* Experience */}
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(108,99,255,0.15)' }}>
                  <Briefcase size={16} className="text-[#6C63FF]" />
                </div>
                <h3 className="font-display font-semibold text-[#F0EFFF]">Experience</h3>
              </div>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.company} className="glass rounded-2xl p-5 border-l-2 border-[#A78BFA44]">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="font-display font-semibold text-[#F0EFFF] text-sm">{exp.role}</h4>
                      <span className="text-xs text-[#A78BFA] font-mono whitespace-nowrap mt-0.5">{exp.period}</span>
                    </div>
                    <p className="text-[#6C63FF] text-xs mb-3">{exp.company}</p>
                    <ul className="space-y-1.5">
                      {exp.points.map((pt, i) => (
                        <li key={i} className="text-[#8892B0] text-xs leading-relaxed flex gap-2">
                          <span className="text-[#6C63FF] mt-1 shrink-0">▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
