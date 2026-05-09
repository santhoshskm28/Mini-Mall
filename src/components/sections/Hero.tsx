"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { MotionWrapper } from "../ui/MotionWrapper";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        videoRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 2.5 }
      )
      .fromTo(
        headlineRef.current,
        { y: 60, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.8 },
        "-=1.5"
      )
      .fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1.2"
      )
      .fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1"
      );

      // Deep Parallax Zoom
      gsap.to(videoRef.current, {
        scale: 1.3,
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6 pt-32"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-fashion-store-interior-with-modern-lighting-42861-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl">
        <div className="overflow-hidden mb-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/60 block"
          >
            A Global Destination Platform
          </motion.span>
        </div>
        
        <h1
          ref={headlineRef}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-8 leading-[0.9] text-glow"
        >
          More Than <br />
          <span className="text-white/40">A Mall</span>
        </h1>

        <p
          ref={subheadlineRef}
          className="text-lg md:text-2xl font-light text-white/80 max-w-2xl mx-auto mb-12 tracking-wide"
        >
          Retail. Entertainment. Culture. Partnerships.
        </p>

        <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <Button variant="primary" size="lg">
            Explore Retail
          </Button>
          <Button variant="glass" size="lg">
            Explore Events
          </Button>
          <Button variant="outline" size="lg">
            Partnership Opportunities
          </Button>
        </div>
      </div>

      {/* Ambient Audio-Reactive Visualization (Simulated) */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8 opacity-20 pointer-events-none">
         {[...Array(24)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               height: [
                 Math.random() * 10 + 2, 
                 Math.random() * 30 + 10, 
                 Math.random() * 10 + 2
               ] 
             }}
             transition={{ 
               duration: Math.random() * 0.5 + 0.5, 
               repeat: Infinity, 
               ease: "easeInOut" 
             }}
             className="w-[2px] bg-white rounded-full"
           />
         ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};
