import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, Send, Download } from 'lucide-react'

// ── REPLACE THESE PLACEHOLDERS ───────────────────────────────────────────────
const GITHUB_URL = 'https://github.com/SHARON1609/'
const LINKEDIN_URL = 'https://linkedin.com/in/sharon-prince-u/'
const EMAIL = 'sharonprinceu@gmail.com'
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
  {
    label: 'GitHub',
    href: GITHUB_URL,
    icon: Github,
    desc: 'See my code',
    color: '#6C63FF',
  },
  {
    label: 'LinkedIn',
    href: LINKEDIN_URL,
    icon: Linkedin,
    desc: 'Connect with me',
    color: '#A78BFA',
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    icon: Mail,
    desc: EMAIL,
    color: '#818CF8',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Wire to your preferred form handler (Formspree, EmailJS, etc.)
    // Placeholder: just shows success state
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-28 relative" style={{ background: 'rgba(15,18,33,0.5)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 opacity-30"
        style={{ background: 'linear-gradient(to bottom, transparent, #A78BFA)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F0EFFF] mt-4">
            Let's work together
          </h2>
          <p className="text-[#8892B0] mt-4 max-w-lg mx-auto">
            I'm open to internships, full-time roles, and interesting projects. Drop a message — I usually reply within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Social cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid #1E2440',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = s.color + '40'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${s.color}15`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#1E2440'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}25` }}
                >
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="font-display font-semibold text-[#F0EFFF] text-sm">{s.label}</p>
                  <p className="text-[#8892B0] text-xs mt-0.5">{s.desc}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${s.color}20` }}>
                    <s.icon size={12} style={{ color: s.color }} />
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="/Sharon_Resume.pdf"
                download
                className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div>
                <label className="block text-xs font-display font-medium text-[#8892B0] mb-2 tracking-wide uppercase">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full rounded-xl px-4 py-3 text-sm text-[#F0EFFF] placeholder-[#8892B044] outline-none transition-all duration-300 focus:border-[#6C63FF]"
                  style={{
                    background: 'rgba(8,11,20,0.6)',
                    border: '1px solid #1E2440',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-display font-medium text-[#8892B0] mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full rounded-xl px-4 py-3 text-sm text-[#F0EFFF] placeholder-[#8892B044] outline-none transition-all duration-300 focus:border-[#6C63FF]"
                  style={{
                    background: 'rgba(8,11,20,0.6)',
                    border: '1px solid #1E2440',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-display font-medium text-[#8892B0] mb-2 tracking-wide uppercase">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  placeholder="Tell me about the opportunity..."
                  className="w-full rounded-xl px-4 py-3 text-sm text-[#F0EFFF] placeholder-[#8892B044] outline-none transition-all duration-300 focus:border-[#6C63FF] resize-none"
                  style={{
                    background: 'rgba(8,11,20,0.6)',
                    border: '1px solid #1E2440',
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>✓ Message sent!</>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-[#8892B055] font-mono">
                {/* Connect to Formspree or EmailJS for actual form submission */}
                Wire up to Formspree / EmailJS for production
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
