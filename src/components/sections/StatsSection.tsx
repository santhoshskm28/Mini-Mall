"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";

const stats = [
  { label: "Annual Visitors", value: 40000000, suffix: "+", sub: "Global Reach" },
  { label: "Retail Brands", value: 500, suffix: "+", sub: "Premium Portfolio" },
  { label: "Dining Destinations", value: 50, suffix: "+", sub: "Culinary Mastery" },
  { label: "Annual Events", value: 400, suffix: "+", sub: "Cultural Stage" },
];

export const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray(".stat-value");
      
      counters.forEach((counter: any) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        gsap.to(counter, {
          innerText: target,
          duration: 3,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
          onUpdate: function() {
            counter.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString() + (counter.getAttribute("data-suffix") || "");
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="relative min-h-screen bg-black py-48 px-6 overflow-hidden border-b border-white/5">
      {/* Background Animated Grid */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          <MotionWrapper className="lg:col-span-7">
             <h2 className="text-sm uppercase tracking-[0.6em] text-white/40 mb-8 font-bold">Unrivaled Scale</h2>
             <h3 className="text-6xl md:text-[8rem] font-display font-bold leading-[0.85] tracking-tighter text-mask">
               Monumental <br/> <span className="text-white">Impact.</span>
             </h3>
          </MotionWrapper>
          <MotionWrapper delay={0.2} className="lg:col-span-5 lg:pt-24">
             <p className="text-2xl text-white/50 font-light leading-relaxed">
               We operate at a scale that redefines the retail landscape. A global stage where brands meet millions.
             </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10, rotateX: 5 }}
              className="flex flex-col gap-6 group min-w-0"
            >
              <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/40 transition-colors duration-700" />
              <div className="overflow-hidden">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-4">{stat.label}</div>
                <div 
                  className="stat-value text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-display font-bold text-glow break-words leading-none"
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  0
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 mt-4 font-bold">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -right-24 opacity-10 select-none pointer-events-none">
         <span className="text-[30rem] font-display font-bold text-white/5 leading-none">40M</span>
      </div>
    </section>
  );
};
