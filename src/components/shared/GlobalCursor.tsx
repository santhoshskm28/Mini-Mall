"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const GlobalCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9999]"
      animate={{ x: mousePos.x - 200, y: mousePos.y - 200 }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
    >
      <div className="w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[100px]" />
    </motion.div>
  );
};
