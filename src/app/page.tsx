"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";

const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(mod => mod.StatsSection), { ssr: false });
const InteractiveMap = dynamic(() => import("@/components/sections/InteractiveMap").then(mod => mod.InteractiveMap), { ssr: false });
const RetailHorizontalScroll = dynamic(() => import("@/components/sections/RetailHorizontalScroll").then(mod => mod.RetailHorizontalScroll), { ssr: false });
const DiningSection = dynamic(() => import("@/components/sections/DiningSection").then(mod => mod.DiningSection), { ssr: false });
const EntertainmentSection = dynamic(() => import("@/components/sections/EntertainmentSection").then(mod => mod.EntertainmentSection), { ssr: false });
const EventsPlatform = dynamic(() => import("@/components/sections/EventsPlatform").then(mod => mod.EventsPlatform), { ssr: false });
const SponsorshipModule = dynamic(() => import("@/components/sections/SponsorshipModule").then(mod => mod.SponsorshipModule), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then(mod => mod.FinalCTA), { ssr: false });

import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-black min-h-screen">
      <LoadingScreen />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      
      {/* 0. Hero Section */}
      <Hero />

      {/* 1. Scale & Impact Section */}
      <StatsSection />

      {/* 2. Interactive Destination Map */}
      <InteractiveMap />

      {/* 3. Retail Experience (Horizontal Scroll) */}
      <RetailHorizontalScroll />

      {/* 4. Dining & Lifestyle Section */}
      <DiningSection />

      {/* 5. Entertainment Section */}
      <EntertainmentSection />

      {/* 6. Events Platform Module */}
      <EventsPlatform />

      {/* 7. Sponsorship & Partnerships */}
      <SponsorshipModule />

      {/* 8. Final CTA & Closing Experience */}
      <FinalCTA />

      {/* Footer Minimal */}
      <footer className="py-24 px-6 border-t border-white/5 text-center bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-2xl font-display font-bold mb-12 tracking-tighter">
            MALL OF <span className="text-white/30">AMERICA</span>
          </div>
          <div className="flex justify-center gap-12 text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Vimeo</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
          <div className="mt-12 text-white/10 text-[10px] uppercase tracking-widest">
            © 2024 Mall of America. All Rights Reserved. Immersive Experience by SKM.
          </div>
        </div>
      </footer>
    </main>
  );
}
