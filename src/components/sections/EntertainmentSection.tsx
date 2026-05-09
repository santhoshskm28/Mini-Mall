"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";
import { Button } from "../ui/Button";
import gsap from "gsap";

const panels = [
  {
    title: "Nickelodeon Universe",
    subtitle: "Epic Thrills",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80",
    className: "lg:col-span-8",
    speed: 0.05,
  },
  {
    title: "SEA LIFE Aquarium",
    subtitle: "Ocean Wonders",
    image: "https://images.unsplash.com/photo-1544551763-47a1842303a1?auto=format&fit=crop&q=80",
    className: "lg:col-span-4",
    speed: 0.1,
  },
  {
    title: "Events & Concerts",
    subtitle: "Global Stage",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
    className: "lg:col-span-5",
    speed: 0.08,
  },
  {
    title: "Modern Nightlife",
    subtitle: "Electric Energy",
    image: "https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80",
    className: "lg:col-span-7",
    speed: 0.06,
  },
];

export const EntertainmentSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".ent-panel").forEach((panel: any, i) => {
        gsap.fromTo(panel, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 90%",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="entertainment" className="relative min-h-screen bg-black py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
          <MotionWrapper className="max-w-3xl">
            <h2 className="text-sm uppercase tracking-[0.6em] text-white/40 mb-8 font-bold">Unrivaled Energy</h2>
            <h3 className="text-6xl md:text-9xl font-display font-bold leading-tight">
              Beyond <br/> <span className="text-white/20 italic tracking-tighter">Imagination.</span>
            </h3>
          </MotionWrapper>
          <MotionWrapper delay={0.2} className="pb-4">
             <Button variant="outline" size="lg" className="border-white/10 hover:border-white/40">Explore Attractions</Button>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full">
          {panels.map((panel, i) => (
            <div 
              key={i} 
              className={`${panel.className} ent-panel relative h-[500px] md:h-[700px] rounded-[4rem] overflow-hidden group shadow-luxury`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.3 }}
                  whileInView={{ scale: 1.1 }}
                  transition={{ duration: 2 }}
                  src={panel.image} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-100 transition-all duration-[2000ms] ease-out"
                  alt={panel.title}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-16 left-16 z-20">
                 <span className="text-xs uppercase tracking-[0.4em] text-white/60 font-bold mb-4 block">{panel.subtitle}</span>
                 <h4 className="text-4xl md:text-5xl font-display font-bold tracking-tight">{panel.title}</h4>
              </div>

              {/* High-Contrast Interactive Overlay */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-[4rem] transition-colors duration-700 pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                 <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white/10 to-transparent blur-[80px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
