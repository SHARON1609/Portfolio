import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

const GITHUB_URL = 'https://github.com/SHARON1609/'
const LINKEDIN_URL = 'https://linkedin.com/in/sharon-prnce-u/'
const EMAIL = 'sharonprinceu@gmail.com'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t py-10" style={{ borderColor: '#1E2440' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display font-bold text-lg text-gradient">Sharon Prince U<span className="text-[#6C63FF]">.</span></p>
          <p className="text-[#8892B0] text-xs mt-1">© {new Date().getFullYear()} Sharon Prince U. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { href: GITHUB_URL, Icon: Github, label: 'GitHub' },
            { href: LINKEDIN_URL, Icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${EMAIL}`, Icon: Mail, label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8892B0] hover:text-[#6C63FF] transition-colors"
              style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid #1E2440' }}
            >
              <Icon size={16} />
            </motion.a>
          ))}

          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8892B0] hover:text-[#6C63FF] transition-colors ml-2"
            style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid #1E2440' }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
