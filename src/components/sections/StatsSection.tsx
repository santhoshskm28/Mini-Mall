"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";

const RollingNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 3000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Cubic out easing
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easedProgress * end);
        
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "circOut" }}
        className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-glow tracking-tighter"
      >
        {displayValue.toLocaleString()}{suffix}
      </motion.div>
    </div>
  );
};

const stats = [
  { label: "Annual Visitors", value: 40000000, suffix: "+", sub: "Global Reach" },
  { label: "Retail Brands", value: 500, suffix: "+", sub: "Premium Portfolio" },
  { label: "Dining Destinations", value: 50, suffix: "+", sub: "Culinary Mastery" },
  { label: "Annual Events", value: 400, suffix: "+", sub: "Cultural Stage" },
];

export const StatsSection = () => {
  return (
    <section id="experience" className="relative min-h-screen bg-black py-64 px-6 overflow-hidden border-b border-white/5">
      {/* Background Animated Grid */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center mb-64">
          <MotionWrapper className="lg:col-span-7">
             <h2 className="text-sm uppercase tracking-[1em] text-white/30 mb-12 font-bold ml-1">Unrivaled Scale</h2>
             <h3 className="text-7xl md:text-[12rem] font-display font-bold leading-[0.8] tracking-tighter text-mask">
               Monumental <br/> <span className="text-white">Impact.</span>
             </h3>
          </MotionWrapper>
          <MotionWrapper delay={0.2} className="lg:col-span-5 lg:pt-32">
             <p className="text-3xl text-white/40 font-light leading-relaxed italic">
               "We operate at a scale that redefines the retail landscape. A global stage where brands meet millions."
             </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -20, rotateX: 5 }}
              className="flex flex-col gap-10 group min-w-0 perspective-1000"
            >
              <div className="h-[2px] w-full bg-white/5 group-hover:bg-white/20 transition-all duration-700" />
              <div className="flex flex-col gap-4">
                <div className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-bold">{stat.label}</div>
                <RollingNumber value={stat.value} suffix={stat.suffix} />
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/10 mt-4 font-bold">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-48 -right-48 opacity-5 select-none pointer-events-none">
         <span className="text-[40rem] font-display font-bold text-white leading-none">40M</span>
      </div>
    </section>
  );
};
