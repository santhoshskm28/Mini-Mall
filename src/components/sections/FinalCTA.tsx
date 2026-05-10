"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export const FinalCTA = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black border-t border-white/5">
      {/* Breathtaking Finale Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-white rounded-full blur-[200px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        
        {/* Animated Particles abstraction */}
        <div className="absolute inset-0 opacity-20">
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
                 y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"]
               }}
               transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl"
             />
           ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "1em" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-xs md:text-sm font-bold uppercase text-white/30 mb-16 block ml-[1em]"
        >
          THE FUTURE IS NOW
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[12rem] font-display font-bold leading-[0.8] tracking-tighter mb-24 text-glow"
        >
          Join The World's <br/> <span className="text-white/20 italic">Most Visited.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col md:flex-row gap-12 justify-center items-center"
        >
          <Button variant="primary" size="lg" className="px-20 py-8">Lease Opportunities</Button>
          <Button variant="glass" size="lg" className="px-20 py-8">Book A Venue</Button>
          <Button variant="outline" size="lg" className="px-20 py-8">Partnership Inquiry</Button>
        </motion.div>
      </div>

      {/* Footer Minimal Overlay */}
      <div className="absolute bottom-16 text-[10px] uppercase tracking-[1em] text-white/10 font-bold ml-[1em]">
        MALL OF AMERICA — GLOBAL DESTINATION PLATFORM
      </div>
    </section>
  );
};
