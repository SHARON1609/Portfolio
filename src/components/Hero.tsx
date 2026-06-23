import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, FolderOpen } from 'lucide-react'
import profilePhoto from "../assets/sharon.png";
import resumePDF from "../assets/Sharon_Prince_U_Resume.pdf";

interface Particle { x: number; y: number; vx: number; vy: number; r: number; alpha: number }

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 8000), 120)
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = 0, h = 0

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      initParticles(w, h)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const pts = particles.current
      for (const p of pts) {
        p.x += p.vx + (mouse.current.x - p.x) * 0.00008
        p.y += p.vy + (mouse.current.y - p.y) * 0.00008
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(108,99,255,${p.alpha})`
        ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouse)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [initParticles])

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Constellation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — content */}
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="section-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-4 tracking-tight"
            >
              Hi, I'm{' '}
              <span className="block text-gradient">Sharon Prince U</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-6">
              <p className="font-display text-lg md:text-xl text-[#A78BFA] font-medium tracking-wide">
                Software Engineer · Full Stack Developer
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[#8892B0] text-base md:text-lg leading-relaxed max-w-lg mb-10"
            >
              Final-year CS undergrad at SNS College of Technology building production-grade
              web applications. I work across the full stack — Java backends, React frontends,
              and everything in between.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2"
              >
                <FolderOpen size={16} />
                View Projects
              </button>
              <a
                href={resumePDF}
                download
                className="btn-ghost flex items-center gap-2"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-14 flex gap-8"
            >
              {[
                { number: '2+', label: 'Internships' },
                { number: '4+', label: 'Projects' },
                { number: '8+', label: 'Technologies' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-gradient">{stat.number}</p>
                  <p className="text-xs text-[#8892B0] mt-0.5 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 animate-pulse-slow"
                style={{ background: 'radial-gradient(circle, #6C63FF, transparent 70%)' }}
              />

              {/* Photo frame */}
              <div className="relative w-72 h-80 rounded-3xl glass glow-indigo overflow-hidden group animate-float">
                {/* Photo placeholder — replace src with your actual photo */}
                <div
                  className="w-full h-full"
                  style={{ background: 'linear-gradient(160deg, #141829 0%, #0F1221 100%)' }}
                >
                  <img
                    src={profilePhoto}
                    alt="Sharon Prince U"
                    className="w-full h-full object-cover"
                  />
                </div>


                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: 'rgba(108,99,255,0.2)' }}>
                    💻
                  </div>
                  <div>
                    <p className="text-xs font-display font-medium text-[#F0EFFF]">SNS College of Technology</p>
                    <p className="text-[10px] text-[#8892B0]">B.E. Computer Science · 2023–2027</p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -top-6 -right-6 w-24 h-24 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(#6C63FF 1px, transparent 1px)',
                  backgroundSize: '8px 8px'
                }} />
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[#8892B0] text-xs font-display tracking-widest uppercase">Scroll</p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} className="text-[#6C63FF]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
