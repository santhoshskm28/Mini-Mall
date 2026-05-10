"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";

const Particles = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh",
            opacity: Math.random() * 0.5 
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50 + "vh"],
            opacity: [null, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-[1px] h-[1px] bg-white rounded-full"
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 40,
        y: (clientY / innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        videoRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 2.5 }
      )
      .from(".char", {
        y: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 1.5,
        ease: "power4.out"
      }, "-=1.5");

      gsap.to(videoRef.current, {
        scale: 1.3,
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6 pt-32"
    >
      {/* Background Video with Mouse Parallax */}
      <motion.div 
        style={{ x: mousePos.x * -1.5, y: mousePos.y * -1.5 }}
        className="absolute inset-0 z-0 scale-110"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-fashion-store-interior-with-modern-lighting-42861-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      <Particles />

      {/* Content with Mouse Parallax */}
      <motion.div 
        ref={contentRef}
        style={{ x: mousePos.x, y: mousePos.y }}
        className="relative z-10 max-w-7xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-8"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.8em] uppercase text-white/40">
            A Global Destination Platform
          </span>
        </motion.div>
        
        <h1 className="text-[12vw] md:text-[10vw] font-display font-bold tracking-tighter mb-12 leading-[0.85] text-glow">
          <div className="overflow-hidden">
             <motion.span className="block">More Than</motion.span>
          </div>
          <div className="overflow-hidden">
             <motion.span className="block text-white/30 italic">A Mall</motion.span>
          </div>
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-12">
           <div className="flex flex-col items-center gap-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold mb-4">Explore The Experience</div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" size="lg">Retail</Button>
                <Button variant="glass" size="lg">Entertainment</Button>
                <Button variant="outline" size="lg">Partnerships</Button>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Ambient Audio-Reactive Visualization (Simulated) */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-12 opacity-20 pointer-events-none">
         {[...Array(40)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               height: [
                 Math.random() * 5 + 2, 
                 Math.random() * 40 + 10, 
                 Math.random() * 5 + 2
               ] 
             }}
             transition={{ 
               duration: Math.random() * 0.4 + 0.3, 
               repeat: Infinity, 
               ease: "easeInOut" 
             }}
             className="w-[1.5px] bg-white rounded-full"
           />
         ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Scroll to discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
};
