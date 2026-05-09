"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export const FinalCTA = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black border-t border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xs md:text-sm font-semibold tracking-[0.5em] uppercase text-white/40 mb-8 block"
        >
          Define Your Legacy
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.8] tracking-tighter mb-16 text-glow"
        >
          Join The <br/> <span className="text-white/30 italic">Platform.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <Button variant="primary" size="lg" className="px-12">Book A Venue</Button>
          <Button variant="glass" size="lg" className="px-12">Leasing Inquiry</Button>
          <Button variant="outline" size="lg" className="px-12">Partnership Discussion</Button>
        </motion.div>
      </div>

      {/* Footer Minimal Overlay */}
      <div className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-white/10 font-bold">
        Mall of America — Future of Experience
      </div>
    </section>
  );
};
