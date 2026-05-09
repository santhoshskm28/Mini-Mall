"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";
import { Button } from "../ui/Button";
import { Calendar, Users, MapPin, Zap } from "lucide-react";
import gsap from "gsap";

const venues = [
  {
    name: "Rotunda",
    capacity: "5,000+",
    ideal: "Concerts & Launches",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
  },
  {
    name: "Huntington Bank Court",
    capacity: "2,000+",
    ideal: "Fashion & Exhibitions",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
  },
  {
    name: "Executive Center",
    capacity: "500+",
    ideal: "Corporate & Private",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
  },
];

export const EventsPlatform = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".venue-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".venue-grid",
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="relative min-h-screen bg-black py-[20vh] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-[20vh]">
          <MotionWrapper>
            <h2 className="text-sm uppercase tracking-[0.6em] text-white/40 mb-8 font-bold">The Stage</h2>
            <h3 className="text-6xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-12">
              Where Culture <br/> <span className="text-white/20 italic tracking-tighter">Unfolds.</span>
            </h3>
            <p className="text-2xl text-white/50 leading-relaxed font-light mb-16 max-w-xl">
              From global product launches to massive esports tournaments, we provide the world's most versatile event platform.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
               <div className="flex items-center gap-6">
                  <div className="p-4 glass rounded-3xl text-white/40"><Calendar size={24} /></div>
                  <div>
                    <div className="text-2xl font-bold">400+</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Annual Events</div>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <div className="p-4 glass rounded-3xl text-white/40"><Users size={24} /></div>
                  <div>
                    <div className="text-2xl font-bold">Infinite</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Possibilities</div>
                  </div>
               </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2} className="relative aspect-square rounded-[4rem] overflow-hidden group shadow-luxury">
            <img 
              src="https://images.unsplash.com/photo-1540575861501-7c001173a270?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-[2000ms]"
              alt="Live Event"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-24 h-24 glass rounded-full flex items-center justify-center animate-pulse">
                  <Zap size={32} className="text-white" />
               </div>
            </div>
          </MotionWrapper>
        </div>

        <div className="venue-grid grid grid-cols-1 md:grid-cols-3 gap-12 mb-[15vh]">
          {venues.map((venue, i) => (
            <div key={i} className="venue-card group">
              <div className="relative h-[600px] rounded-[4rem] overflow-hidden mb-8 border border-white/5 group-hover:border-white/10 transition-all duration-700 shadow-luxury">
                <img src={venue.image} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-1000" alt={venue.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 flex flex-col gap-6">
                   <div>
                     <h4 className="text-4xl font-display font-bold mb-2 tracking-tight">{venue.name}</h4>
                     <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold tracking-[0.3em]">{venue.ideal}</div>
                   </div>
                   <div className="h-[1px] w-full bg-white/10" />
                   <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-white/70">{venue.capacity}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Capacity</div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pb-24">
           <Button variant="primary" size="lg" className="px-24 py-6 rounded-full shadow-glow">Book Your Experience</Button>
        </div>
      </div>
    </section>
  );
};
