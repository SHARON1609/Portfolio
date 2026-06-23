import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map(l => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-[#1E2440]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={e => { e.preventDefault(); handleNav('#home') }}
          className="font-display font-bold text-xl text-gradient select-none"
          whileHover={{ scale: 1.02 }}
        >
          Sharon<span className="text-[#6C63FF]">.</span>
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`relative px-4 py-2 text-sm font-display font-medium rounded-lg transition-colors duration-300 ${
                active === link.href.slice(1)
                  ? 'text-[#A78BFA]'
                  : 'text-[#8892B0] hover:text-[#F0EFFF]'
              }`}
            >
              {active === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(108,99,255,0.12)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </div>

        {/* CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <a
            href="/Sharon_Resume.pdf"
            download
            className="hidden md:block btn-primary text-xs py-2 px-4"
          >
            Resume
          </a>
          <button
            className="md:hidden p-2 rounded-lg text-[#8892B0] hover:text-[#F0EFFF] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-[#1E2440] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-display font-medium transition-colors ${
                    active === link.href.slice(1)
                      ? 'bg-[#6C63FF1A] text-[#A78BFA]'
                      : 'text-[#8892B0] hover:text-[#F0EFFF] hover:bg-[#ffffff08]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
