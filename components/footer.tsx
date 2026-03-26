"use client"

import { motion } from "framer-motion"
import { Shield, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  services: [
    { name: "Telecommunications", href: "/mandate/telecommunications" },
    { name: "Broadcasting", href: "/mandate/broadcasting" },
    { name: "Internet Services", href: "/mandate/internet" },
    { name: "Spectrum Management", href: "/services/spectrum" },
    { name: "Cybersecurity", href: "/cybersecurity" },
  ],
  resources: [
    { name: "File Complaint", href: "/complaints" },
    { name: "Apply for License", href: "/services/licensing" },
    { name: "News & Media", href: "/news" },
    { name: "Regulations & Documents", href: "/documents" },
    { name: "Open Tenders", href: "/tenders" },
  ],
  about: [
    { name: "About BOCRA", href: "/about" },
    { name: "Leadership", href: "/about#leadership" },
    { name: "Mission & Vision", href: "/about#mission" },
    { name: "Board of Directors", href: "/about#board" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Notice", href: "/documents" },
    { name: "Terms of Use", href: "/documents" },
    { name: "Accessibility", href: "/contact" },
    { name: "Report Security Issue", href: "/cybersecurity" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/bocrabw" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/bocrabw" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/bocra" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@bocra" },
]

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <div className="flex flex-col items-end">
                <span className="font-display text-4xl font-black tracking-tighter text-foreground leading-none">
                  BOCRA
                </span>
                <div className="flex gap-1 mt-1 pr-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#005BA6]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A651]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E3004F]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFC72C]" />
                </div>
              </div>
              <div className="flex flex-col border-l border-border pl-4">
                <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase leading-tight">
                  Communications
                </span>
                <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase leading-tight">
                  Regulatory Authority
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Regulating Botswana{"'"}s digital future through innovation, protection, and inclusive connectivity.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-bocra-blue" />
                <span>Plot 206, Independence Avenue, Gaborone</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-bocra-blue" />
                <span>+267 395 7755</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-bocra-blue" />
                <span>info@bocra.org.bw</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-bocra-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-bocra-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-bocra-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-bocra-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground"
            >
              © 2026 Botswana Communications Regulatory Authority. All rights reserved.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-bocra-blue transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
