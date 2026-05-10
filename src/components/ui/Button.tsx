"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver"> {
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const x = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-white text-black hover:bg-opacity-90",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10",
    glass: "glass text-white hover:bg-white/10",
  };

  const sizes = {
    sm: "px-6 py-2 text-[10px] uppercase tracking-widest",
    md: "px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold",
    lg: "px-12 py-6 text-base uppercase tracking-[0.3em] font-bold",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full transition-all duration-300 shadow-luxury group overflow-hidden",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </motion.button>
  );
};
