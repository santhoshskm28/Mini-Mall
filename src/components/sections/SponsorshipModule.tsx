"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MotionWrapper } from "../ui/MotionWrapper";
import { Check, ArrowRight, TrendingUp, BarChart3, Globe } from "lucide-react";
import gsap from "gsap";

const tiers = [
  {
    name: "Strategic",
    desc: "Long-term brand integration and category exclusivity.",
    features: ["Digital Network Access", "Physical Activations", "Naming Rights"],
    color: "bg-zinc-900",
    icon: <Globe size={40} className="text-white/20 mb-8" />,
  },
  {
    name: "Experiential",
    desc: "Direct engagement with our 40M+ annual visitors.",
    features: ["Pop-up Retail", "Event Sponsorships", "Custom Installations"],
    color: "bg-white text-black",
    icon: <TrendingUp size={40} className="text-black/20 mb-8" />,
  },
  {
    name: "Digital",
    desc: "Targeted visibility across our massive digital ecosystem.",
    features: ["App Integrations", "Social Media Push", "Email Campaigns"],
    color: "bg-zinc-900",
    icon: <BarChart3 size={40} className="text-white/20 mb-8" />,
  },
];

const MiniChart = () => (
  <div className="flex items-end gap-1.5 h-16 opacity-30 mt-8 group-hover:opacity-100 transition-opacity duration-1000">
    {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h * 100}%` }}
        transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
        className="w-1.5 bg-current rounded-full"
      />
    ))}
  </div>
);

export const SponsorshipModule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tier-card", {
        y: 150,
        opacity: 0,
        stagger: 0.2,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".tier-grid",
          start: "top 90%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="partnerships" className="relative py-[25vh] px-6 bg-black overflow-hidden border-t border-white/5">
      {/* Background Analytics UI abstraction */}
      <div className="absolute top-0 right-0 w-[50vw] h-screen opacity-5 pointer-events-none z-0">
         <div className="absolute top-1/4 right-24 w-64 h-64 border border-white rounded-full flex items-center justify-center">
            <div className="w-48 h-48 border border-white/40 rounded-full animate-spin-slow" />
         </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-[20vh] gap-16">
          <MotionWrapper className="max-w-5xl">
            <h2 className="text-xs uppercase tracking-[1em] text-white/30 mb-12 font-bold">Partnership Platform</h2>
            <h3 className="text-7xl md:text-[10rem] font-display font-bold leading-[0.8] tracking-tighter">
              Amplify Your <br/> <span className="text-white/20 italic">Global Identity.</span>
            </h3>
          </MotionWrapper>
          <MotionWrapper delay={0.2} className="text-2xl text-white/40 max-w-sm font-light leading-relaxed pb-8 italic">
            "Join the platform that defines modern consumer engagement on a global scale."
          </MotionWrapper>
        </div>

        <div className="tier-grid grid grid-cols-1 md:grid-cols-3 gap-16 mb-[25vh]">
          {tiers.map((tier, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -30, scale: 1.02 }}
              className={`tier-card p-16 rounded-[5rem] border border-white/5 flex flex-col justify-between group transition-all duration-1000 shadow-[0_0_100px_rgba(0,0,0,0.8)] ${tier.color}`}
            >
              <div>
                {tier.icon}
                <h4 className="text-6xl font-display font-bold mb-10 tracking-tighter">{tier.name}</h4>
                <p className={`mb-20 text-xl leading-relaxed font-light italic ${tier.color.includes('white') ? 'text-black/60' : 'text-white/40'}`}>
                  {tier.desc}
                </p>
                <ul className="space-y-10">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-6 text-lg font-medium tracking-tight">
                      <div className={`p-2.5 rounded-full ${tier.color.includes('white') ? 'bg-black text-white' : 'bg-white text-black shadow-glow'}`}>
                        <Check size={18} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <MiniChart />
              </div>
              <button className={`mt-32 flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.5em] group/btn transition-all ${tier.color.includes('white') ? 'hover:text-black/60' : 'hover:text-white/60'}`}>
                Inquire Platform <ArrowRight size={24} className="group-hover/btn:translate-x-6 transition-transform duration-700" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Analytics View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           <MotionWrapper className="lg:col-span-8 glass p-24 rounded-[5rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-24 shadow-luxury overflow-hidden relative">
              <div className="flex-1 relative z-10">
                 <div className="text-xs uppercase tracking-[0.6em] text-white/30 font-bold mb-6">Targeted Reach</div>
                 <div className="text-[10rem] font-display font-bold mb-6 tracking-tighter leading-none">40M</div>
                 <div className="text-sm uppercase tracking-[0.4em] text-white/20 font-bold">Annual Engaged Consumers</div>
              </div>
              <div className="hidden md:block h-64 w-[1px] bg-white/5" />
              <div className="flex-1 text-right relative z-10">
                 <div className="text-xs uppercase tracking-[0.6em] text-white/30 font-bold mb-6">Economic Power</div>
                 <div className="text-[8rem] font-display font-bold mb-6 tracking-tighter leading-none">$1.2B</div>
                 <div className="text-sm uppercase tracking-[0.4em] text-white/20 font-bold">Annual Tourism Spend</div>
              </div>
              
              {/* Background Accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/[0.02] -skew-x-12" />
           </MotionWrapper>
           
           <MotionWrapper delay={0.2} className="lg:col-span-4 glass p-24 rounded-[5rem] border-white/5 flex flex-col justify-center text-center shadow-luxury">
              <div className="mb-12 flex justify-center">
                 <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full rotate-[-90deg]">
                       <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                       <motion.circle 
                          cx="64" cy="64" r="60" 
                          stroke="white" strokeWidth="3" fill="transparent" 
                          strokeDasharray="377"
                          initial={{ strokeDashoffset: 377 }}
                          whileInView={{ strokeDashoffset: 377 * 0.2 }}
                          transition={{ duration: 2, ease: "circOut" }}
                       />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-display font-bold">80%</div>
                 </div>
              </div>
              <div>
                 <div className="text-3xl font-display font-bold mb-6 tracking-tight text-white/80 leading-tight">Global Connectivity</div>
                 <p className="text-lg text-white/30 max-w-xs mx-auto font-light leading-relaxed italic">"Integrated digital infrastructure reaching elite consumers across the ecosystem."</p>
              </div>
           </MotionWrapper>
        </div>
      </div>
    </section>
  );
};
