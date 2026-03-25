"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ChevronDown, Shield, Radio, Globe, Wifi, FileText, Phone, Target, Clock, ShieldCheck, Users, Briefcase, FileBox, Newspaper } from "lucide-react"
import Link from "next/link"

const resourcesLinks = [
  { name: "Projects", icon: Target, href: "/projects" },
  { name: "Documents", icon: FileBox, href: "/documents" },
  { name: "News & Media", icon: Newspaper, href: "/news" },
  { name: "Tenders", icon: Briefcase, href: "/tenders" },
]

const aboutLinks = [
  { name: "Mission & Vision", icon: Target, href: "/about#mission" },
  { name: "History", icon: Clock, href: "/about#history" },
  { name: "Our Mandate", icon: ShieldCheck, href: "/about#mandate" },
  { name: "Board of Directors", icon: Users, href: "/about#board" },
  { name: "Leadership", icon: Briefcase, href: "/about#leadership" },
]

const services = [
  { name: "Telecommunications", icon: Phone, href: "/mandate/telecommunications" },
  { name: "Broadcasting", icon: Radio, href: "/mandate/broadcasting" },
  { name: "Internet Services", icon: Globe, href: "/mandate/internet" },
  { name: "Spectrum Management", icon: Wifi, href: "/services/spectrum" },
  { name: "Cybersecurity", icon: Shield, href: "/cybersecurity" },
  { name: "Licensing", icon: FileText, href: "/services/licensing" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-bocra-blue/10"
        : "bg-transparent"
        }`}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />

      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="flex flex-col items-end">
              <span className="font-display text-3xl sm:text-4xl font-black tracking-tighter text-foreground leading-none">
                BOCRA
              </span>
              <div className="flex gap-1 mt-1 pr-1">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#005BA6]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00A651]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E3004F]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFC72C]" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col border-l border-border pl-4">
              <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase leading-tight">
                Communications
              </span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase leading-tight">
                Regulatory Authority
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              Home
              <motion.span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-bocra-blue to-bocra-green group-hover:w-4/5 transition-all duration-300"
              />
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                onClick={() => window.location.href = '/about'}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 mt-2 p-2 bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl shadow-bocra-blue/10"
                  >
                    {aboutLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-bocra-blue/10 flex items-center justify-center group-hover:bg-bocra-blue/20 transition-colors">
                          <link.icon className="w-4 h-4 text-bocra-blue" />
                        </div>
                        {link.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 mt-2 p-2 bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl shadow-bocra-blue/10"
                  >
                    {services.map((service, i) => (
                      <motion.a
                        key={service.name}
                        href={service.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-bocra-blue/10 flex items-center justify-center group-hover:bg-bocra-blue/20 transition-colors">
                          <service.icon className="w-4 h-4 text-bocra-blue" />
                        </div>
                        {service.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Resources
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 mt-2 p-2 bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl shadow-bocra-blue/10"
                  >
                    {resourcesLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-bocra-blue/10 flex items-center justify-center group-hover:bg-bocra-blue/20 transition-colors">
                          <link.icon className="w-4 h-4 text-bocra-blue" />
                        </div>
                        {link.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              Contact
              <motion.span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-bocra-blue to-bocra-green group-hover:w-4/5 transition-all duration-300"
              />
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative hidden sm:block"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    autoFocus
                    className="w-full h-10 pl-4 pr-10 rounded-full bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-bocra-blue/50"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Search className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* CTA Button */}
            <motion.a
              href="/complaints"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 px-5 h-10 rounded-full bg-gradient-to-r from-bocra-blue to-bocra-green text-white text-sm font-semibold hover:shadow-lg hover:shadow-bocra-blue/30 transition-all"
            >
              File a Complaint
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-muted/50"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-foreground rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-foreground rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-foreground rounded-full"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-t border-border"
          >
            <div className="px-6 py-4 space-y-2 max-h-[75vh] overflow-y-auto">
              {["Home", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block py-2 text-lg font-medium text-foreground hover:text-bocra-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}

              <div className="py-2">
                <a href="/about" className="block text-lg font-medium text-foreground mb-2" onClick={() => setMobileMenuOpen(false)}>About</a>
                <div className="pl-4 space-y-2 border-l border-border ml-2">
                  {aboutLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block py-1.5 text-muted-foreground hover:text-bocra-blue transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <div className="text-lg font-medium text-foreground mb-2">Services</div>
                <div className="pl-4 space-y-2 border-l border-border ml-2">
                  {services.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block py-1.5 text-muted-foreground hover:text-bocra-blue transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <div className="text-lg font-medium text-foreground mb-2">Resources</div>
                <div className="pl-4 space-y-2 border-l border-border ml-2">
                  {resourcesLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block py-1.5 text-muted-foreground hover:text-bocra-blue transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <a
                  href="/complaints"
                  className="block w-full py-3 mt-4 rounded-full bg-gradient-to-r from-bocra-blue to-bocra-green text-white text-center font-semibold"
                >
                  File a Complaint
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}