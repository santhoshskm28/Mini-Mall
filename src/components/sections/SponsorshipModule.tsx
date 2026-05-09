"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";
import { Check, ArrowRight } from "lucide-react";
import gsap from "gsap";

const tiers = [
  {
    name: "Strategic",
    desc: "Long-term brand integration and category exclusivity.",
    features: ["Digital Network Access", "Physical Activations", "Naming Rights"],
    color: "bg-zinc-900",
  },
  {
    name: "Experiential",
    desc: "Direct engagement with our 40M+ annual visitors.",
    features: ["Pop-up Retail", "Event Sponsorships", "Custom Installations"],
    color: "bg-white text-black",
  },
  {
    name: "Digital",
    desc: "Targeted visibility across our massive digital ecosystem.",
    features: ["App Integrations", "Social Media Push", "Email Campaigns"],
    color: "bg-zinc-900",
  },
];

export const SponsorshipModule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tier-card", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".tier-grid",
          start: "top 85%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="partnerships" className="relative py-[25vh] px-6 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-[15vh] gap-16">
          <MotionWrapper className="max-w-4xl">
            <h2 className="text-sm uppercase tracking-[0.6em] text-white/40 mb-8 font-bold">Partnerships</h2>
            <h3 className="text-6xl md:text-[8rem] font-display font-bold leading-[0.85] tracking-tighter">
              Elevate Your <br/> <span className="text-white/20 italic tracking-tighter">Brand Identity.</span>
            </h3>
          </MotionWrapper>
          <MotionWrapper delay={0.2} className="text-xl text-white/40 max-w-sm font-light leading-relaxed pb-4">
            We don't just host brands; we amplify them. Join the platform that defines modern consumer engagement.
          </MotionWrapper>
        </div>

        <div className="tier-grid grid grid-cols-1 md:grid-cols-3 gap-12 mb-[20vh]">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`tier-card p-16 rounded-[4rem] border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-all duration-700 shadow-luxury ${tier.color}`}
            >
              <div>
                <h4 className="text-5xl font-display font-bold mb-8 tracking-tight">{tier.name}</h4>
                <p className={`mb-16 text-lg leading-relaxed font-light ${tier.color.includes('white') ? 'text-black/60' : 'text-white/40'}`}>
                  {tier.desc}
                </p>
                <ul className="space-y-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-6 text-base font-medium tracking-tight">
                      <div className={`p-2 rounded-full ${tier.color.includes('white') ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <Check size={16} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`mt-24 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] group/btn transition-colors ${tier.color.includes('white') ? 'hover:text-black/60' : 'hover:text-white/60'}`}>
                Inquire <ArrowRight size={20} className="group-hover/btn:translate-x-4 transition-transform duration-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Insight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <MotionWrapper className="lg:col-span-8 glass p-20 rounded-[4rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-16 shadow-luxury">
              <div className="flex-1">
                 <div className="text-8xl font-display font-bold mb-6 tracking-tighter">40%</div>
                 <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Of visitors are tourists</div>
              </div>
              <div className="hidden md:block h-32 w-[1px] bg-white/5" />
              <div className="flex-1 text-right">
                 <div className="text-8xl font-display font-bold mb-6 tracking-tighter">$1.2B</div>
                 <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Annual Tourism Spend</div>
              </div>
           </MotionWrapper>
           <MotionWrapper delay={0.2} className="lg:col-span-4 glass p-20 rounded-[4rem] border-white/5 flex items-center justify-center text-center shadow-luxury">
              <div>
                 <div className="text-4xl font-display font-bold mb-6 tracking-tight text-white/80 leading-tight">Massive Global Visibility</div>
                 <p className="text-base text-white/40 max-w-xs mx-auto font-light leading-relaxed">Integrated digital network reaching millions of engaged consumers.</p>
              </div>
           </MotionWrapper>
        </div>
      </div>
    </section>
  );
};
