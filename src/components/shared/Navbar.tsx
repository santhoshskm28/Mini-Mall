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

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  
  const logoX = useSpring(0, { stiffness: 150, damping: 15 });
  const logoY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 py-8",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-all duration-700",
        isScrolled ? "glass-dark rounded-full px-8 py-3 shadow-luxury" : ""
      )}>
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
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-all duration-500 hover:tracking-[0.5em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
          <Button variant="glass" size="sm" className="rounded-full px-8 text-[10px] tracking-widest border-white/5">
            Partner With Us
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white/60 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            className="fixed inset-0 z-[-1] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center p-8 md:hidden"
          >
            <div className="flex flex-col gap-12 items-center text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  className="text-4xl font-display font-bold tracking-tighter text-white/60 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Button size="lg">Partner With Us</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
