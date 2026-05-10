"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "Retail", href: "#retail" },
  { name: "Entertainment", href: "#entertainment" },
  { name: "Partnerships", href: "#partnerships" },
];

const MagneticLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.5);
    y.set((clientY - (top + height / 2)) * 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-colors relative group py-2"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
    </motion.a>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const logoRef = useRef<HTMLDivElement>(null);
  
  const logoX = useSpring(0, { stiffness: 150, damping: 15 });
  const logoY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Active section detection
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = logoRef.current.getBoundingClientRect();
    logoX.set((clientX - (left + width / 2)) * 0.4);
    logoY.set((clientY - (top + height / 2)) * 0.4);
  };

  const resetLogo = () => {
    logoX.set(0);
    logoY.set(0);
  };

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 py-8", isScrolled ? "py-4" : "py-8")}>
      <div className={cn("max-w-7xl mx-auto flex items-center justify-between transition-all duration-700", isScrolled ? "glass-dark rounded-full px-8 py-3 shadow-luxury" : "")}>
        {/* Magnetic Logo */}
        <motion.div 
          ref={logoRef}
          onMouseMove={handleLogoMove}
          onMouseLeave={resetLogo}
          style={{ x: logoX, y: logoY }}
          className="text-xl font-display font-bold tracking-tighter flex items-center gap-2 cursor-pointer group"
        >
          MALL OF <span className={cn("transition-opacity duration-700 group-hover:opacity-100", isScrolled ? "opacity-30" : "opacity-50")}>AMERICA</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <MagneticLink key={link.name} href={link.href}>
              <span className={cn("transition-colors duration-500", activeSection === link.href.substring(1) ? "text-white" : "")}>
                {link.name}
              </span>
            </MagneticLink>
          ))}
          <Button variant="glass" size="sm" className="rounded-full px-8 text-[10px] tracking-widest border-white/5">
            Partner With Us
          </Button>
        </div>

        {/* Menu Toggle */}
        <button 
          className="p-2 text-white/60 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[-1] flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col gap-8 items-center text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 30, skewY: 5 }}
                  animate={{ opacity: 1, y: 0, skewY: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}
                  href={link.href}
                  className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white/40 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                className="mt-12"
              >
                <Button size="lg" className="px-16">Start a Partnership</Button>
              </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
