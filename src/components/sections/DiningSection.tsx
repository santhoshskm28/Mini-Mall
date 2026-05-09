"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";
import gsap from "gsap";

export const DiningSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(img1Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
        }
      });
      gsap.to(img2Ref.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="dining" className="relative min-h-screen bg-zinc-950 py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Headline Background Layer */}
          <div className="absolute -top-24 -left-24 opacity-[0.03] select-none pointer-events-none hidden lg:block">
             <span className="text-[20rem] font-display font-bold whitespace-nowrap">CULINARY</span>
          </div>

          {/* Main Image Layer */}
          <div className="lg:col-span-8 relative">
            <div className="relative h-[700px] rounded-[4rem] overflow-hidden group shadow-luxury">
              <img 
                ref={img1Ref}
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover scale-110 opacity-60 group-hover:opacity-80 transition-opacity duration-1000"
                alt="Dining Experience"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              <div className="absolute bottom-16 left-16">
                 <h3 className="text-sm uppercase tracking-[0.6em] text-white/40 mb-4 font-bold">Editorial No. 04</h3>
                 <span className="text-5xl md:text-8xl font-display font-bold text-glow">Art of Taste.</span>
              </div>
            </div>

            {/* Overlapping Detail Image */}
            <div className="absolute -bottom-24 -right-24 w-80 h-96 rounded-[3rem] overflow-hidden border-[10px] border-zinc-950 shadow-luxury hidden lg:block z-20">
               <img 
                 ref={img2Ref}
                 src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80" 
                 className="w-full h-full object-cover scale-125"
                 alt="Cocktail Detail"
               />
            </div>
          </div>

          {/* Text Layer */}
          <div className="lg:col-span-4 lg:pl-12 space-y-16">
            <MotionWrapper className="relative">
              <div className="h-[1px] w-12 bg-white/40 mb-8" />
              <h4 className="text-3xl font-display font-bold mb-6">A Tapestry of Global Flavors</h4>
              <p className="text-xl text-white/50 leading-relaxed font-light">
                From Michelin-starred concepts to vibrant street food, our dining portfolio is curated as a global tapestry of culinary innovation.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2} className="glass p-12 rounded-[3.5rem]">
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold uppercase">MOA</div>
                  <div className="h-[1px] flex-1 bg-white/5" />
               </div>
               <p className="text-sm text-white/40 leading-relaxed italic mb-8">
                 "Innovation in hospitality starts with the senses. We've built a stage for the world's most talented chefs."
               </p>
               <button className="text-xs uppercase tracking-[0.4em] font-bold text-white hover:text-white/60 transition-colors">
                 Explore the Portfolio
               </button>
            </MotionWrapper>
          </div>
        </div>
      </div>

      {/* Atmospheric Glows */}
      <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none opacity-20" />
    </section>
  );
};
