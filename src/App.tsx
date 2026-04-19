/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  Cpu, 
  Globe, 
  Layers, 
  Zap, 
  Layout, 
  Smartphone, 
  Database,
  Lock,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  Sun,
  Moon,
  Star,
  Activity,
  CreditCard,
  ShoppingBag,
  Building2,
  Briefcase
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
type Section = 'hero' | 'interactive' | 'preview' | 'pricing' | 'trust' | 'connect';
type Step = 1 | 2 | 3 | 4;

interface UserChoices {
  need: string;
  budget: string;
  timeline: string;
}

// --- Components ---

const GrainBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] contrast-150 grayscale invert" 
    style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} 
  />
);

const GlowEffect = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 50, 0],
        y: [0, 30, 0]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.3, 0.1],
        x: [0, -40, 0],
        y: [0, -20, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 blur-[160px] rounded-full" 
    />
  </div>
);

const Navbar = ({ toggleTheme, theme }: { toggleTheme: () => void, theme: 'dark' | 'light' }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:py-8 backdrop-blur-md border-b border-border">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-accent rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.5)] flex items-center justify-center">
        <Cpu className="w-5 h-5 text-black" />
      </div>
      <span className="font-sans font-bold text-xl tracking-tighter uppercase text-text-primary">Growsphere</span>
    </div>
    
    <div className="hidden md:flex items-center gap-8 font-sans text-[10px] font-bold uppercase tracking-widest text-text-secondary">
      <a href="#about" className="hover:text-accent transition-colors">About Us</a>
      <a href="#services" className="hover:text-accent transition-colors">Services</a>
      <a href="#industries" className="hover:text-accent transition-colors">Industries</a>
      <a href="#pricing" className="hover:text-accent transition-colors">Pricing</a>
      <a href="#reviews" className="hover:text-accent transition-colors">Reviews</a>
    </div>

    <div className="flex items-center gap-4">
      <button 
        onClick={toggleTheme}
        className="p-2 border border-border rounded-lg text-text-primary hover:bg-card-bg transition-colors"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <button className="hidden sm:block px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-black rounded-lg hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]">
        Get Started
      </button>
    </div>
  </nav>
);

const Hero = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 pt-32 pb-20 max-w-[1280px] mx-auto gap-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-left max-w-[620px]"
      >
        <div className="inline-flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-8 bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
          <Sparkles className="w-3 h-3" />
          Strategic Expansion Protocol Active
        </div>
        
        <h1 className="font-sans text-[clamp(48px,8vw,92px)] font-black leading-[0.88] tracking-[-0.04em] text-text-primary mb-8 uppercase">
          Build<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white/40">Beyond</span><br />limits.
        </h1>
        
        <p className="font-sans text-xl text-text-secondary mb-12 leading-relaxed max-w-[480px]">
          Growsphere Consulting architects elite digital systems for founders 
          engineered to dominate global markets. High-density execution starts at $499.
        </p>
        
        <div className="flex flex-wrap items-center gap-12 border-t border-border pt-12">
          {[
            { value: "07-14", label: "Day Delivery" },
            { value: "100%", label: "IP Ownership" },
            { value: "24/7", label: "Node Uptime" },
          ].map((metric, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-3xl font-black text-text-primary tracking-tighter">{metric.value}</div>
              <div className="text-[10px] text-text-secondary uppercase tracking-widest font-black">{metric.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <div className="relative z-10 w-full max-w-[480px]">
        <motion.div
           initial={{ opacity: 0, rotateY: 20, x: 50 }}
           whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, delay: 0.2 }}
           style={{ perspective: 1000 }}
           className="glass-card p-12 relative group hover:shadow-accent/10 transition-shadow duration-700"
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 blur-[40px] rounded-full group-hover:bg-accent/20 transition-all" />
          
          <div className="absolute inset-x-12 top-10 flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={cn("h-0.5 flex-1 rounded-full transition-all duration-1000", i === 1 ? "bg-accent shadow-[0_0_15px_rgba(0,240,255,1)]" : "bg-white/5 group-hover:bg-white/10")} />
            ))}
          </div>
          
          <div className="mt-12">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <h2 className="text-sm font-black text-text-primary uppercase tracking-widest">Growth Engine 1.0</h2>
             </div>
             <p className="text-text-secondary mb-10 text-sm font-medium leading-relaxed">
               Ready to architect your digital ecosystem? <br />Configure mission parameters below.
             </p>
             <button 
                onClick={onStart}
                className="group relative w-full py-5 bg-text-primary text-bg font-sans font-black text-xs uppercase tracking-[3px] rounded-xl hover:bg-accent hover:text-black transition-all overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-accent/20 group-hover:h-full transition-all duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Launch Protocol <ArrowRight className="w-4 h-4" />
                </span>
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const InteractiveStep = ({ step, next, choices, setChoices }: { step: Step, next: () => void, choices: UserChoices, setChoices: (c: UserChoices) => void }) => {
  const steps = [
    {
      title: "The Vision.",
      description: "What are we architecting today?",
      options: ["Custom Web Ecosystem", "iOS / Android Native App", "Enterprise SaaS Solution", "AI-Integrated Infrastructure"],
      key: "need"
    },
    {
      title: "Fueling the Engine.",
      description: "Allocated capital dictates code density.",
      options: ["$499 - $5k", "$10k - $25k", "$25k - $100k", "Unlimited Series A+"],
      key: "budget"
    },
    {
      title: "The Velocity.",
      description: "When should this reality manifest?",
      options: ["ASAP (Blitz)", "4-8 Weeks", "Quarterly Cycle", "Strategic Planning"],
      key: "timeline"
    }
  ];

  const currentStepData = steps[step - 1];

  const handleSelect = (option: string) => {
    setChoices({ ...choices, [currentStepData.key]: option });
    setTimeout(next, 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="glass-card max-w-[540px] w-full p-12 relative"
    >
      <div className="absolute inset-x-12 top-10 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn("h-1 flex-1 rounded-sm transition-colors duration-500", i <= step ? "bg-accent shadow-[0_0_10px_#00F0FF]" : "bg-white/10")} />
        ))}
      </div>

      <div className="mt-10 mb-10">
        <h2 className="text-[28px] font-bold text-white mb-3">
          {currentStepData.title}
        </h2>
        <p className="text-neutral-500 font-medium">
          {currentStepData.description}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {currentStepData.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={cn(
              "group relative p-5 text-left border rounded-2xl transition-all duration-300 flex justify-between items-center",
              choices[currentStepData.key as keyof UserChoices] === option
                ? "bg-accent/5 border-accent text-white"
                : "bg-white/[0.03] border-white/10 text-neutral-300 hover:border-accent hover:bg-accent/[0.02]"
            )}
          >
            <span className="font-sans font-semibold text-sm">
              {option}
            </span>
            <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", choices[currentStepData.key as keyof UserChoices] === option ? "text-accent" : "text-neutral-500")} />
          </button>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
        <div className="flex flex-col">
          <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Project starts at</div>
          <div className="text-xl font-bold text-accent">$499 USD</div>
        </div>
        <button className="px-6 py-3 bg-white text-black rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
          Initiate Sequence
        </button>
      </div>
    </motion.div>
  );
};

const ResultProjection = ({ choices, reset }: { choices: UserChoices, reset: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl w-full text-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-8">
        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
        ANALYSIS COMPLETE
      </div>
      
      <h2 className="font-sans text-4xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
        PROJECTION READY.
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Target Architecture", value: choices.need, icon: Layers },
          { label: "Resource Allocation", value: choices.budget, icon: Database },
          { label: "Deployment Phase", value: choices.timeline, icon: Zap },
        ].map((item, i) => (
          <div key={i} className="p-8 glass-card text-left">
            <item.icon className="w-8 h-8 text-accent mb-6" />
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">{item.label}</div>
            <div className="text-xl font-bold text-white leading-tight">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="p-12 glass-card relative overflow-hidden group">
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-4">Growsphere Growth Protocol</h3>
          <p className="text-neutral-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your expansion vision is compatible with our high-impact scaling forge. 
            We recommend an <b>Integrated Strategic Ecosystem</b> for <b>{choices.need}</b>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-5 bg-accent text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
              Initiate Growth
            </button>
            <button 
              onClick={reset}
              className="w-full sm:w-auto px-10 py-5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/5 transition-colors"
            >
              Recalibrate Sphere
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TrustSignals = () => (
  <section className="py-32 border-y border-border bg-bg overflow-hidden relative">
    <div className="absolute inset-0 bg-accent/[0.02] mix-blend-overlay pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="mb-20 flex flex-col items-center">
        <div className="text-[10px] font-black text-text-secondary uppercase tracking-[0.5em] mb-12">
          Global Strategic Network
        </div>
        <div className="w-full relative py-12 overflow-hidden">
           {/* Auto-scrolling Marquee */}
           <motion.div 
            animate={{ x: [0, -1200] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700"
           >
            {['ANDURIL', 'SCALE AI', 'REVOLUT', 'MONZO', 'KLARNA', 'BOLT', 'ZEPTO', 'CRED', 'RAZORPAY'].map((brand, i) => (
              <span key={i} className="font-sans font-black text-4xl tracking-tighter filter grayscale">{brand}</span>
            ))}
            {/* Repeat for seamless loop */}
            {['ANDURIL', 'SCALE AI', 'REVOLUT', 'MONZO', 'KLARNA', 'BOLT', 'ZEPTO', 'CRED', 'RAZORPAY'].map((brand, i) => (
              <span key={i+10} className="font-sans font-black text-4xl tracking-tighter filter grayscale">{brand}</span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: Lock, label: "Zero Trust", desc: "Military-grade encryption and biometric-ready data storage." },
          { icon: MessageCircle, label: "Sync-Channel", desc: "Direct fiber-link to your dedicated strategy node." },
          { icon: Globe, label: "Edge Protocol", desc: "Global CDN distribution ensures sub-10ms response cycles." },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 hover:border-accent/40 group transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center mb-8 border border-accent/10 group-hover:bg-accent group-hover:scale-110 transition-all">
              <item.icon className="w-6 h-6 text-accent group-hover:text-black transition-colors" />
            </div>
            <h4 className="text-xl font-black text-text-primary mb-4 tracking-tight">{item.label}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-black">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
          <Cpu className="w-4 h-4 text-black" />
        </div>
        <span className="font-sans font-bold text-lg tracking-tighter">GROWSPHERE</span>
      </div>
      <div className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest flex gap-8">
        <span>© 2026 Growsphere Consulting Org.</span>
        <a href="#" className="hover:text-white transition-colors">Protocol</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
      </div>
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent/10 transition-colors">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent/10 transition-colors">
          <Globe className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  </footer>
);

const FeatureGrid = () => (
  <section id="services" className="py-32 px-6 bg-card-bg/20">
    <div className="container mx-auto">
      <div className="text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6"
        >
          Execution Modules
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary mb-6">SERVICES.</h2>
        <p className="text-text-secondary max-w-xl mx-auto text-lg leading-relaxed">Scaling high-frequency digital ecosystems through unified strategy and deployment.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "AI Strategy", desc: "Every line of code is augmented by our proprietary LLM forge.", icon: Sparkles },
          { title: "UI/UX Design", desc: "Interfaces polished for cognitive ease and high-retention.", icon: Layout },
          { icon: Zap, title: "Web Apps", desc: "Optimized for sub-100ms response times globally.", accent: true },
          { icon: Smartphone, title: "Mobile Dev", desc: "Binary compatibility across all mobile and web OS." },
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 glass-card hover:bg-accent group transition-all duration-500 cursor-default"
          >
            <feature.icon className={cn("w-12 h-12 mb-8 transition-all group-hover:text-black group-hover:scale-110", feature.accent ? "text-accent" : "text-text-secondary")} />
            <h3 className="text-2xl font-black text-text-primary group-hover:text-black mb-4 tracking-tight transition-colors">{feature.title}</h3>
            <p className="text-text-secondary group-hover:text-black/70 text-sm leading-relaxed transition-colors">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AboutUs = () => (
  <section id="about" className="py-32 px-6 border-y border-border">
    <div className="container mx-auto max-w-4xl text-center">
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary mb-8 text-center uppercase">About Us.</h2>
      <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-12">
        We are <span className="text-text-primary font-bold italic">Growsphere Consulting</span> — a strategic collective of engineers and designers obsessed with one thing: <span className="text-accent underline decoration-2 underline-offset-4">Exponential Expansion</span>. Based at the intersection of AI and Strategy, we forge digital ecosystems that outperform the competition.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {[
          { label: "Elite Engineers", value: "12+" },
          { label: "Global Clients", value: "40+" },
          { label: "Growth Ratio", value: "3.2x" }
        ].map((stat, i) => (
          <div key={i} className="p-6">
            <div className="text-3xl font-black text-text-primary mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const IndustriesServed = () => (
  <section id="industries" className="py-32 px-6 border-t border-border bg-card-bg/10">
    <div className="container mx-auto">
      <div className="text-center mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6"
        >
          Target Sectors
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary mb-6 uppercase">Industries.</h2>
        <p className="text-text-secondary max-w-xl mx-auto text-lg leading-relaxed">We deploy high-density strategic code for the world's most critical sectors.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: Activity, label: "HealthTech" },
          { icon: CreditCard, label: "FinTech" },
          { icon: ShoppingBag, label: "E-Commerce" },
          { icon: Building2, label: "PropTech" },
          { icon: Briefcase, label: "SaaS" },
          { icon: Zap, label: "Energy" },
        ].map((industry, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col items-center justify-center p-8 glass-card hover:bg-accent border border-border grayscale hover:grayscale-0 transition-all cursor-default"
          >
            <industry.icon className="w-8 h-8 text-text-secondary group-hover:text-black mb-4 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary group-hover:text-black transition-colors">{industry.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ClientReviews = () => (
  <section id="reviews" className="py-32 px-6">
    <div className="container mx-auto max-w-[1280px]">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="max-w-2xl text-left">
          <div className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-4">Transmission Logs</div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary uppercase leading-none">Voices of <br />Expansion.</h2>
        </div>
        <div className="flex gap-2 mb-4">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
          <span className="ml-4 font-sans font-black text-text-primary uppercase tracking-widest text-sm">4.9/5 Rating</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            quote: "Growsphere didn't just build a site; they built a revenue engine. Our retention shot up by 40% in two months after the Omega Tier deployment.",
            author: "Sarah Chen",
            role: "Founder, Scale AI Sub-Node",
            company: "USA",
            avatar: "SC"
          },
          {
            quote: "The speed of execution was terrifying. We went from a sketch to a high-density FinTech platform in 14 days. Absolutely authentic results.",
            author: "Liam O'Connor",
            role: "CTO, Revolut Ecosystem",
            company: "UK",
            avatar: "LO"
          },
          {
            quote: "Finally, a consultancy that talks strategy and delivers pure code. They are the strategic forge for any founder refusing average growth.",
            author: "Aarav Gupta",
            role: "CEO, Zepto Labs",
            company: "India",
            avatar: "AG"
          }
        ].map((review, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-10 glass-card relative group hover:border-accent/30 transition-all"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-black text-accent text-xs">
                 {review.avatar}
               </div>
               <div>
                 <div className="text-white font-bold text-sm tracking-tight">{review.author}</div>
                 <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">{review.company} // {review.role}</div>
               </div>
            </div>
            <div className="relative">
              <span className="absolute -top-6 -left-4 text-7xl font-serif text-accent opacity-10">"</span>
              <p className="text-text-secondary leading-relaxed font-medium italic relative z-10">
                {review.quote}
              </p>
            </div>
            <div className="mt-8 flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="py-32 px-6">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-24">
        <h2 className="font-sans text-6xl md:text-8xl font-black tracking-tighter text-text-primary mb-6 uppercase">Investment.</h2>
        <p className="text-text-secondary max-w-lg mx-auto uppercase tracking-[0.3em] text-[11px] font-bold">Scaling quality requires capital. Choose your tier.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { name: "Alpha Tier", price: "$499", tier: "Starter", features: ["Single Page App", "AI Branding", "3-Day Sprint"] },
          { name: "Delta Tier", price: "$2,499", tier: "Growth", features: ["Full SaaS Suite", "Custom API", "UI Strategy", "14-Day Sprint"], popular: true },
          { name: "Omega Tier", price: "Custom", tier: "Enterprise", features: ["Microservices", "Native iOS/Android", "24/7 Dedicated Ops"] },
        ].map((plan, i) => (
          <div key={i} className={cn(
            "p-12 rounded-[32px] border transition-all duration-700 flex flex-col relative overflow-hidden",
            plan.popular ? "bg-accent border-accent scale-105 z-10 shadow-[0_0_50px_rgba(0,240,255,0.2)]" : "bg-card-bg border-border"
          )}>
            {plan.popular && <div className="absolute top-0 right-0 py-1.5 px-6 bg-black text-accent text-[9px] font-black uppercase tracking-widest rounded-bl-xl">Best Value</div>}
            
            <div className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-3", plan.popular ? "text-neutral-800" : "text-accent")}>
              {plan.tier}
            </div>
            <h4 className={cn("text-4xl font-sans font-extrabold mb-8 tracking-tighter leading-none", plan.popular ? "text-black" : "text-text-primary")}>{plan.name}</h4>
            <div className={cn("text-6xl font-sans font-light tracking-tighter mb-10", plan.popular ? "text-black" : "text-text-primary")}>
              {plan.price}
              <span className="text-sm tracking-normal font-sans ml-2 opacity-60">/ project</span>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className={cn("flex items-center gap-4 text-sm font-semibold", plan.popular ? "text-neutral-900" : "text-text-secondary")}>
                  <CheckCircle2 className={cn("w-5 h-5 shrink-0", plan.popular ? "text-black" : "text-accent")} />
                  {f}
                </li>
              ))}
            </ul>
            <button className={cn(
              "w-full py-5 rounded-xl font-sans font-extrabold text-[12px] uppercase tracking-[2px] transition-all",
              plan.popular ? "bg-black text-white hover:brightness-125 shadow-xl" : "bg-white/[0.05] text-text-primary border border-border hover:bg-accent hover:text-black hover:border-accent"
            )}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

import { ChatAssistant } from './components/ChatAssistant';

// --- Main App ---

export default function App() {
  const [section, setSection] = useState<Section>('hero');
  const [step, setStep] = useState<Step>(1);
  const [choices, setChoices] = useState<UserChoices>({ need: '', budget: '', timeline: '' });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const startFlow = () => setSection('interactive');
  const nextStep = () => {
    if (step < 3) setStep(step + 1 as Step);
    else setSection('preview');
  };
  const resetFlow = () => {
    setSection('hero');
    setStep(1);
    setChoices({ need: '', budget: '', timeline: '' });
  };

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-black font-sans overflow-x-hidden">
      <GrainBackground />
      <GlowEffect />
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <main className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {section === 'hero' && (
            <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onStart={startFlow} />
              <div className="mt-[-10vh]">
                <TrustSignals />
                <IndustriesServed />
                <AboutUs />
                <FeatureGrid />
                <ClientReviews />
                <PricingSection />
              </div>
            </motion.div>
          )}

          {section === 'interactive' && (
            <div key="interactive" className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
              <InteractiveStep 
                step={step} 
                next={nextStep} 
                choices={choices} 
                setChoices={setChoices} 
              />
            </div>
          )}

          {section === 'preview' && (
            <div key="preview" className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20">
              <ResultProjection choices={choices} reset={resetFlow} />
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <div id="contact" className="fixed bottom-6 left-6 z-[60] group">
        <button 
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-3 px-4 py-3 bg-accent text-black rounded-full font-sans font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          Talk to Growth Analyst
        </button>
      </div>

      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Futuristic Floating Cursor Dot */}
      <CursorDot />
    </div>
  );
}

const CursorDot = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-4 h-4 bg-white mix-blend-difference rounded-full pointer-events-none z-[100] hidden md:block"
      animate={{ 
        x: position.x - 8, 
        y: position.y - 8,
        scale: isPointer ? 4 : 1
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
    />
  );
};

