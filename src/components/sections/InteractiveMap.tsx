"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const zones = [
  {
    id: "retail",
    title: "World-Class Retail",
    desc: "From flagship luxury to emerging labels, discover 500+ stores that define the modern shopping landscape.",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80",
    pos: { top: "25%", left: "40%" },
  },
  {
    id: "luxury",
    title: "Luxury Row",
    desc: "A curated collection of the world's most prestigious fashion houses and high-jewelry brands.",
    image: "https://images.unsplash.com/photo-1548036627-09be8583b1c9?auto=format&fit=crop&q=80",
    pos: { top: "45%", left: "65%" },
  },
  {
    id: "dining",
    title: "Immersive Dining",
    desc: "An editorial-style culinary journey featuring 50+ global dining destinations.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    pos: { top: "65%", left: "35%" },
  },
  {
    id: "entertainment",
    title: "Epic Entertainment",
    desc: "Experience the energy of Nickelodeon Universe, SEA LIFE, and world-class attractions.",
    image: "https://images.unsplash.com/photo-1534235648391-115e19235bbd?auto=format&fit=crop&q=80",
    pos: { top: "35%", left: "20%" },
  },
  {
    id: "events",
    title: "Cultural Events",
    desc: "A global stage for 400+ annual events, from celebrity appearances to cultural festivals.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
    pos: { top: "75%", left: "55%" },
  },
];

export const InteractiveMap = () => {
  const [activeZone, setActiveZone] = useState(zones[0]);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!infoRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 50;
      const y = (clientY - innerHeight / 2) / 50;
      gsap.to(infoRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-black py-48 px-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Left: Interactive Area */}
        <div className="relative aspect-square w-full glass rounded-[4rem] overflow-hidden group shadow-luxury">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          
          {/* Content Preview */}
          <AnimatePresence mode="wait">
            <motion.img
              key={activeZone.id}
              src={activeZone.image}
              alt={activeZone.title}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.4, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          </AnimatePresence>

          {/* Hotspots */}
          <div className="absolute inset-0 z-20">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onMouseEnter={() => setActiveZone(zone)}
                className="absolute group/hotspot outline-none"
                style={{ top: zone.pos.top, left: zone.pos.left }}
              >
                <div className={cn(
                  "relative w-10 h-10 flex items-center justify-center transition-all duration-700",
                  activeZone.id === zone.id ? "scale-150" : "scale-100"
                )}>
                  <div className={cn(
                    "absolute inset-0 rounded-full animate-ping opacity-20",
                    activeZone.id === zone.id ? "bg-white" : "bg-white/30"
                  )} />
                  <div className={cn(
                    "w-4 h-4 rounded-full transition-all duration-700 shadow-glow",
                    activeZone.id === zone.id ? "bg-white scale-125" : "bg-white/40"
                  )} />
                  
                  {/* Subtle Label on Hover */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-500 pointer-events-none">
                     <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">{zone.title}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="absolute bottom-12 left-12 z-20">
             <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/30">Interactive Platform Explorer</span>
          </div>
        </div>

        {/* Right: Information */}
        <div ref={infoRef} className="flex flex-col justify-center lg:pl-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-sm uppercase tracking-[0.8em] text-white/30 mb-8 font-bold">The Destination</h2>
              <h3 className="text-6xl md:text-8xl font-display font-bold mb-10 leading-[0.9] tracking-tighter text-glow">{activeZone.title}</h3>
              <p className="text-2xl text-white/50 leading-relaxed mb-16 max-w-lg font-light">{activeZone.desc}</p>
              
              <div className="flex gap-6 items-center">
                <div className="h-[2px] w-16 bg-white rounded-full" />
                <div className="h-[1px] w-6 bg-white/20 rounded-full" />
                <div className="h-[1px] w-6 bg-white/20 rounded-full" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
