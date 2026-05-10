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
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mapRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const rotateX = (clientY / innerHeight - 0.5) * 20;
      const rotateY = (clientX / innerWidth - 0.5) * -20;
      
      gsap.to(mapRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} id="map" className="relative min-h-screen bg-black py-64 px-6 flex flex-col items-center justify-center overflow-hidden perspective-3000">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        {/* Left: Pseudo-3D Interactive Map */}
        <div 
          ref={mapRef}
          className="relative aspect-square w-full glass rounded-[5rem] overflow-hidden group shadow-luxury preserve-3d"
        >
          {/* Animated SVG Connections */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-20">
             <motion.path
               d="M 40% 25% Q 50% 45% 65% 45%"
               fill="transparent"
               stroke="white"
               strokeWidth="1"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
             <motion.path
               d="M 65% 45% Q 50% 60% 35% 65%"
               fill="transparent"
               stroke="white"
               strokeWidth="1"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
             />
          </svg>

          {/* Background Media with Motion Blur */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              animate={{ opacity: 0.5, scale: 1.05, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute inset-0"
            >
               <img
                 src={activeZone.image}
                 alt={activeZone.title}
                 className="w-full h-full object-cover grayscale"
               />
            </motion.div>
          </AnimatePresence>

          {/* Hotspots */}
          <div className="absolute inset-0 z-20">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onMouseEnter={() => setActiveZone(zone)}
                className="absolute group/hotspot translate-z-50"
                style={{ top: zone.pos.top, left: zone.pos.left }}
              >
                <div className={cn(
                  "relative w-12 h-12 flex items-center justify-center transition-all duration-700",
                  activeZone.id === zone.id ? "scale-150" : "scale-100"
                )}>
                  <div className={cn(
                    "absolute inset-0 rounded-full animate-pulse opacity-20",
                    activeZone.id === zone.id ? "bg-white scale-150" : "bg-white/30"
                  )} />
                  <div className={cn(
                    "w-4 h-4 rounded-full transition-all duration-700 shadow-glow",
                    activeZone.id === zone.id ? "bg-white scale-125" : "bg-white/40"
                  )} />
                </div>
              </button>
            ))}
          </div>

          <div className="absolute bottom-16 left-16 z-20">
             <span className="text-[10px] uppercase tracking-[1em] font-bold text-white/30">Platform Explorer — V1.0</span>
          </div>
        </div>

        {/* Right: Information */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs uppercase tracking-[0.8em] text-white/30 mb-12 block font-bold"
              >
                The Destination Platform
              </motion.span>
              <h3 className="text-7xl md:text-9xl font-display font-bold mb-12 leading-[0.85] tracking-tighter text-glow">
                 {activeZone.title.split(" ").map((w, i) => (
                   <span key={i} className={i === 1 ? "text-white/30 italic" : ""}>{w} </span>
                 ))}
              </h3>
              <p className="text-3xl text-white/40 leading-tight mb-20 max-w-xl font-light italic">"{activeZone.desc}"</p>
              
              <div className="flex items-center gap-12">
                 <Button variant="primary" size="lg">Explore Zone</Button>
                 <div className="flex gap-4">
                    {zones.map((z) => (
                      <div 
                        key={z.id}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-500",
                          activeZone.id === z.id ? "bg-white w-8" : "bg-white/20"
                        )}
                      />
                    ))}
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
