"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "../cinematic/ThreeBackground";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 3D Cinematic Background */}
          <ThreeBackground />

          {/* Ambient Cinematic Pulse */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" 
          />

          {/* Logo Container */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            <div className="overflow-hidden">
               <motion.div
                 initial={{ y: "100%", skewY: 10 }}
                 animate={{ y: 0, skewY: 0 }}
                 transition={{ duration: 1.2, ease: "circOut" }}
                 className="text-5xl md:text-8xl font-display font-bold tracking-tighter"
               >
                 MALL OF <span className="text-white/30 italic">AMERICA</span>
               </motion.div>
            </div>

            {/* Progress Bar System */}
            <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
               <motion.div 
                 className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: progress / 100 }}
                 transition={{ duration: 0.5 }}
                 style={{ originX: 0 }}
               />
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] uppercase tracking-[1em] text-white/20 font-bold ml-4"
            >
              Experience Initializing
            </motion.div>
          </div>

          {/* Edge Vignette */}
          <div className="absolute inset-0 pointer-events-none vignette" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
