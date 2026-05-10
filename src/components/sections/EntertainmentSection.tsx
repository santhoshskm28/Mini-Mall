"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";
import { Button } from "../ui/Button";
import gsap from "gsap";

const panels = [
  {
    title: "Nickelodeon Universe",
    subtitle: "Epic Thrills",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80",
    className: "lg:col-span-8",
    accent: "bg-orange-500/20",
  },
  {
    title: "SEA LIFE Aquarium",
    subtitle: "Ocean Wonders",
    image: "https://images.unsplash.com/photo-1544551763-47a1842303a1?auto=format&fit=crop&q=80",
    className: "lg:col-span-4",
    accent: "bg-blue-500/20",
  },
  {
    title: "Events & Concerts",
    subtitle: "Global Stage",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
    className: "lg:col-span-5",
    accent: "bg-purple-500/20",
  },
  {
    title: "Modern Nightlife",
    subtitle: "Electric Energy",
    image: "https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80",
    className: "lg:col-span-7",
    accent: "bg-red-500/20",
  },
];

export const EntertainmentSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".ent-panel").forEach((panel: any, i) => {
        gsap.fromTo(panel, 
          { y: 150, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.8, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 95%",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="entertainment" className="relative min-h-screen bg-black py-64 px-6 overflow-hidden">
      {/* Reactive Motion Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-48 gap-12">
          <MotionWrapper className="max-w-4xl">
            <h2 className="text-sm uppercase tracking-[0.8em] text-white/40 mb-8 font-bold">Unrivaled Energy</h2>
            <h3 className="text-7xl md:text-[10rem] font-display font-bold leading-[0.8] tracking-tighter">
              Beyond <br/> <span className="text-white/20 italic">Imagination.</span>
            </h3>
          </MotionWrapper>
          <MotionWrapper delay={0.2} className="pb-8">
             <Button variant="primary" size="lg" className="px-16">Explore All Attractions</Button>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 h-full">
          {panels.map((panel, i) => (
            <div 
              key={i} 
              className={`${panel.className} ent-panel relative h-[600px] md:h-[800px] rounded-[5rem] overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.8)]`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.4 }}
                  whileInView={{ scale: 1.1 }}
                  transition={{ duration: 2.5, ease: "circOut" }}
                  src={panel.image} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-100 transition-all duration-[3000ms] ease-out"
                  alt={panel.title}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />

              <div className="absolute bottom-20 left-20 z-20">
                 <motion.span 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 }}
                   className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-bold mb-6 block"
                 >
                   {panel.subtitle}
                 </motion.span>
                 <h4 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-none">{panel.title}</h4>
                 <Button variant="glass" size="sm" className="opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                   View Details
                 </Button>
              </div>

              {/* Dynamic Glow Interaction */}
              <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none", panel.accent)}>
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-current to-transparent blur-[100px]" />
              </div>
              
              {/* Luxury Border Glow */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-[5rem] transition-all duration-1000 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
