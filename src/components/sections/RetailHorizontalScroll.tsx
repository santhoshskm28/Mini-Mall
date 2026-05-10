"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Flagship Innovation",
    subtitle: "Defining the Future of Retail",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80",
    color: "from-purple-900/40",
  },
  {
    title: "Luxury Row",
    subtitle: "Uncompromising Elegance",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80",
    color: "from-gold-900/40",
  },
  {
    title: "Experiential Commerce",
    subtitle: "Beyond the Transaction",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80",
    color: "from-blue-900/40",
  },
  {
    title: "Global Reach",
    subtitle: "A Stage for World Brands",
    image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80",
    color: "from-zinc-900/40",
  },
];

export const RetailHorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start start", "end end"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const skew = useTransform(smoothVelocity, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-300vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000 top",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        }
      );
      return () => {
        pin.kill();
      };
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} id="retail" className="overflow-hidden">
      <div
        ref={sectionRef}
        className="relative h-screen w-[400vw] flex flex-row items-center"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="h-screen w-screen flex-shrink-0 relative overflow-hidden group"
          >
            {/* Background Image with Masked Reveal */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000"
              />
              <div className={cn("absolute inset-0 bg-gradient-to-r via-black/80 to-black", item.color)} />
            </div>

            {/* Kinetic Content */}
            <motion.div 
              style={{ skewX: skew }}
              className="relative z-10 h-full w-full flex flex-col items-start justify-center px-12 md:px-32"
            >
              <div className="overflow-hidden mb-6">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="text-sm uppercase tracking-[0.6em] text-white/40 font-bold block"
                >
                  0{index + 1} — Retail Experience
                </motion.span>
              </div>
              
              <div className="overflow-hidden mb-8">
                <motion.h2 
                  initial={{ y: "100%", skewY: 5 }}
                  whileInView={{ y: 0, skewY: 0 }}
                  transition={{ duration: 1, ease: "circOut", delay: 0.1 }}
                  className="text-7xl md:text-[14rem] font-display font-bold leading-[0.8] tracking-tighter"
                >
                  {item.title.split(" ").map((word, i) => (
                    <span key={i} className={cn(i % 2 !== 0 && "text-white/10")}>{word}<br className="md:hidden" /> </span>
                  ))}
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-2xl md:text-5xl font-light text-white/50 max-w-4xl"
              >
                {item.subtitle}
              </motion.p>
              
              <div className="mt-24 flex items-center gap-12">
                 <Button variant="primary">Discover Space</Button>
                 <div className="h-[1px] w-48 bg-white/10 relative">
                    <div className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                 </div>
              </div>
            </motion.div>

            {/* Cinematic Progress Info */}
            <div className="absolute bottom-12 right-24 z-20 hidden md:flex items-center gap-12">
               <div className="flex flex-col items-end">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold mb-2">Platform Progress</div>
                  <div className="w-64 h-[1px] bg-white/10 relative">
                     <motion.div 
                       className="absolute inset-0 bg-white origin-left"
                       style={{ scaleX: (index + 1) / items.length }}
                     />
                  </div>
               </div>
               <div className="text-2xl font-display font-bold text-white/40">0{index + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
