/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame, useScroll } from 'motion/react';
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
  Briefcase,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
type Section = 'hero' | 'interactive' | 'preview' | 'pricing' | 'trust' | 'connect';
type Step = 1 | 2 | 3 | 4;

interface UserChoices {
  need: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  mobile: string;
  requirements: string;
}

// --- Components ---

const GrainBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] contrast-150 grayscale dark:invert" 
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

const MouseSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // High damping + Low stiffness = Super smooth, viscous follow
  const springConfig = { damping: 60, stiffness: 40, mass: 1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const scale = useMotionValue(1);

  useAnimationFrame((time) => {
    scale.set(1 + Math.sin(time / 3000) * 0.05);
  });

  return (
    <>
      <motion.div
        style={{ x, y, scale }}
        className="fixed top-0 left-0 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[180px] pointer-events-none z-[1] mix-blend-screen dark:mix-blend-overlay overflow-hidden transition-opacity duration-1000"
      />
      {/* Dynamic Grid Parallax Layer */}
      <motion.div 
        style={{ 
          x: useTransform(x, (val) => val * -0.02),
          y: useTransform(y, (val) => val * -0.02)
        }}
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(var(--accent)_1px,transparent_1px)] bg-[size:100px_100px]"
      />
    </>
  );
};

const Navbar = ({ toggleTheme, theme, onStart }: { toggleTheme: () => void, theme: 'dark' | 'light', onStart: () => void }) => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]);
  const padding = useTransform(scrollY, [0, 100], ["56px", "28px"]);
  const top = useTransform(scrollY, [0, 100], ["40px", "20px"]);

  return (
    <motion.nav 
      style={{ backgroundColor, paddingTop: padding, paddingBottom: padding, top }}
      className="fixed left-6 right-6 lg:left-12 lg:right-12 z-50 flex items-center justify-between px-12 backdrop-blur-xl border border-white/5 rounded-[32px] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ rotate: 180, scale: 1.1 }}
          className="w-12 h-12 bg-accent rounded-xl shadow-[0_0_20px_rgba(21,171,190,0.6)] flex items-center justify-center cursor-pointer"
        >
          <Cpu className="w-7 h-7 text-black" />
        </motion.div>
        <span className="font-sans font-black text-2xl tracking-tighter uppercase text-text-primary">Growsphere</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-12 font-sans text-base font-black uppercase tracking-[0.2em] text-text-secondary">
        {['about', 'services', 'industries', 'pricing', 'reviews'].map((item) => (
          <motion.a
            key={item}
            href={`#${item}`}
            whileHover={{ scale: 1.15, color: "var(--accent)" }}
            className="transition-colors hover:text-accent relative group"
          >
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
          </motion.a>
        ))}
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={toggleTheme}
          className="p-4 border border-border/50 rounded-xl text-text-primary hover:bg-white/5 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <motion.button 
          onClick={onStart}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(21,171,190,0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-10 py-5 text-sm font-black uppercase tracking-[0.2em] bg-accent text-black rounded-xl hover:brightness-110 shadow-[0_10px_20px_rgba(21,171,190,0.4)] transition-all"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
};

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
    {/* Grid System */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(21,171,190,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,171,190,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    
    {/* Pulsing Nodes */}
    <div className="absolute inset-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          className="absolute w-1.5 h-1.5 bg-accent rounded-full [box-shadow:0_0_10px_rgba(21,171,190,0.8)]"
          style={{
            left: `${Math.floor(Math.random() * 20) * 5}%`,
            top: `${Math.floor(Math.random() * 20) * 5}%`,
          }}
        />
      ))}
    </div>
    
    {/* Floating Data Points */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [Math.random() * 100, -200],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: Math.random() * 8 + 12,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
        className="absolute w-px h-24 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const Hero = ({ onStart }: { onStart: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section className="relative min-h-[95vh] flex flex-col md:flex-row items-center justify-between px-6 pt-32 pb-40 max-w-[1440px] mx-auto gap-20 overflow-hidden">
      <motion.div style={{ y: y2 }} className="absolute inset-0 z-[-1]">
        <HeroBackground />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-left max-w-[720px]"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.4em] mb-8 bg-accent/5 px-5 py-2.5 rounded-full border border-accent/20"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          Strategic AI & Software Design
        </motion.div>
        
        <h1 className="font-sans text-[clamp(40px,7vw,80px)] font-black leading-[0.95] tracking-[-0.04em] text-text-primary mb-8 uppercase overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="block"
          >
            Build
          </motion.span>
          <motion.span 
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/80 to-accent/20 bg-[length:200%_auto] dark:to-white/40 block"
          >
            Smarter
          </motion.span>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
            className="block"
          >
            Software.
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-sans text-xl text-text-secondary mb-12 leading-relaxed max-w-[520px]"
        >
          Growsphere helps founders launch high-performance <b>Web Apps</b> and <b>AI Solutions</b> built for speed, security, and global growth.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
          <Magnetic>
            <motion.button 
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-accent text-black font-sans font-black text-xs uppercase tracking-[3px] rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(21,171,190,0.4)]"
            >
              <motion.div 
                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" 
              />
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          </Magnetic>
          
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-all group font-sans font-bold text-[10px] uppercase tracking-widest"
          >
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
              <PlayCircle className="w-5 h-5" />
            </div>
            See Our Work
          </motion.button>
        </div>
        
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-12 mt-20"
        >
          {[
            { value: "07-14", label: "Day Delivery", id: "01" },
            { value: "100%", label: "IP Ownership", id: "02" },
            { value: "24/7", label: "Live Support", id: "03" },
          ].map((metric, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col group relative"
            >
              <div className="font-mono text-[9px] text-accent/50 uppercase tracking-[0.3em] mb-3 group-hover:text-accent transition-colors">
                Metric_{metric.id}
              </div>
              <div className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter group-hover:text-accent transition-colors duration-500">
                {metric.value}
              </div>
              <div className="text-[11px] text-text-secondary uppercase tracking-widest font-black mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                {metric.label}
              </div>
              <div className="absolute -bottom-4 left-0 w-12 h-px bg-accent/20 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <div className="relative z-10 w-full max-w-[480px]">
        <motion.div
           initial={{ opacity: 0, rotateY: 20, x: 50 }}
           whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
           whileHover={{ 
             rotateX: -5,
             rotateY: 5,
             scale: 1.02,
             transition: { duration: 0.2 }
           }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 50 }}
           style={{ perspective: 2000, transformStyle: "preserve-3d" }}
           className="glass-card p-12 relative group hover:shadow-accent/20 transition-all duration-700 backdrop-blur-xl"
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 blur-[60px] rounded-full group-hover:bg-accent/40 animate-pulse transition-all" />
          
      <div className="absolute inset-x-12 top-10 flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn("h-0.5 flex-1 rounded-full transition-all duration-1000", i === 1 ? "bg-accent shadow-[0_0_15px_rgba(21,171,190,1)]" : "bg-text-primary/5 group-hover:bg-text-primary/10")} />
        ))}
      </div>
          
          <div className="mt-12">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <h2 className="text-sm font-black text-text-primary uppercase tracking-widest">Project Launch Pad</h2>
             </div>
             <p className="text-text-secondary mb-10 text-sm font-medium leading-relaxed">
               Ready to scale your business? <br />Configure your project requirements below.
             </p>
             <motion.button 
                onClick={onStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full py-5 bg-text-primary text-bg font-sans font-black text-xs uppercase tracking-[3px] rounded-xl hover:bg-accent hover:text-black transition-all overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-accent/20 group-hover:h-full transition-all duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Launch Protocol <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
             </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const InteractiveStep = ({ step, next, choices, setChoices }: { step: Step, next: () => void, choices: UserChoices, setChoices: (c: any) => void }) => {
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

  if (step === 4) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="glass-card max-w-[600px] w-full p-10 md:p-14 relative"
      >
        <div className="absolute inset-x-12 top-10 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("h-1 flex-1 rounded-sm transition-colors duration-500", i <= step ? "bg-accent shadow-[0_0_10px_rgba(21,171,190,0.5)]" : "bg-text-primary/10")} />
          ))}
        </div>

        <div className="mt-10 mb-8">
          <h2 className="text-[28px] font-bold text-text-primary mb-2 uppercase tracking-tight">Final Details.</h2>
          <p className="text-text-secondary font-medium">Capture your info to finalize the projection.</p>
        </div>

        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(choices.email)) {
              alert("Please enter a valid mission-critical email address.");
              return;
            }
            const subject = `New Strategy Inquiry: ${choices.name}`;
            const body = `
              Project Strategy Matrix:
              -----------------------
              Client: ${choices.name}
              Email: ${choices.email}
              Mobile: ${choices.mobile}
              Vision: ${choices.need}
              Budget: ${choices.budget}
              Timeline: ${choices.timeline}
              Requirements: ${choices.requirements}
            `;
            window.location.href = `mailto:growsphereconsulting@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            next(); 
          }} 
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required
              placeholder="Name"
              value={choices.name}
              onChange={(e) => setChoices({...choices, name: e.target.value})}
              className="bg-white/5 border border-border px-5 py-3.5 rounded-xl text-text-primary focus:border-accent outline-none font-bold"
            />
            <input 
              required
              type="email"
              placeholder="Email"
              value={choices.email}
              onChange={(e) => setChoices({...choices, email: e.target.value})}
              className="bg-white/5 border border-border px-5 py-3.5 rounded-xl text-text-primary focus:border-accent outline-none font-bold"
            />
          </div>
          <input 
            required
            placeholder="Mobile / WhatsApp"
            value={choices.mobile}
            onChange={(e) => setChoices({...choices, mobile: e.target.value})}
            className="bg-white/5 border border-border px-5 py-3.5 rounded-xl text-text-primary focus:border-accent outline-none font-bold"
          />
          <textarea 
            required
            placeholder="Tell us about the project nuances..."
            rows={3}
            value={choices.requirements}
            onChange={(e) => setChoices({...choices, requirements: e.target.value})}
            className="bg-white/5 border border-border px-5 py-3.5 rounded-xl text-text-primary focus:border-accent outline-none font-bold resize-none"
          />
          <button 
            type="submit"
            className="w-full py-5 bg-accent text-black font-black uppercase tracking-widest text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-center"
          >
            Submit Your Inquiry <ArrowRight className="ml-2 w-4 h-4 inline" />
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="glass-card max-w-[540px] w-full p-12 relative"
    >
      <div className="absolute inset-x-12 top-10 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn("h-1 flex-1 rounded-sm transition-colors duration-500", i <= step ? "bg-accent shadow-[0_0_10px_rgba(21,171,190,0.5)]" : "bg-text-primary/10")} />
        ))}
      </div>

      <div className="mt-10 mb-10">
        <h2 className="text-[28px] font-bold text-text-primary mb-3">
          {currentStepData.title}
        </h2>
        <p className="text-text-secondary font-medium">
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
                ? "bg-accent/5 border-accent text-text-primary"
                : "bg-text-primary/[0.02] border-border text-text-secondary hover:border-accent hover:bg-accent/[0.02]"
            )}
          >
            <span className="font-sans font-semibold text-sm">
              {option}
            </span>
            <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", choices[currentStepData.key as keyof UserChoices] === option ? "text-accent" : "text-neutral-500")} />
          </button>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between bg-text-primary/[0.02] border border-border p-5 rounded-2xl">
        <div className="flex flex-col">
          <div className="text-[11px] text-text-secondary font-bold uppercase tracking-widest">Project starts at</div>
          <div className="text-xl font-bold text-accent">$499 USD</div>
        </div>
        <button className="px-6 py-3 bg-text-primary text-bg rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
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
        MISSION DEPLOYED
      </div>
      
      <h2 className="font-sans text-4xl md:text-7xl font-extrabold tracking-tighter text-text-primary mb-6 uppercase">
        Inquiry Sent.
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Target Architecture", value: choices.need, icon: Layers },
          { label: "Resource Allocation", value: choices.budget, icon: Database },
          { label: "Deployment Phase", value: choices.timeline, icon: Zap },
        ].map((item, i) => (
          <div key={i} className="p-8 glass-card text-left">
            <item.icon className="w-8 h-8 text-accent mb-6" />
            <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">{item.label}</div>
            <div className="text-2xl font-bold text-text-primary leading-tight">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="p-12 glass-card relative overflow-hidden group border-accent/30 shadow-[0_0_50px_rgba(21,171,190,0.1)]">
        <div className="absolute inset-0 bg-accent/5 opacity-100 transition-opacity duration-1000" />
        <div className="relative z-10">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
             <CheckCircle2 className="w-10 h-10 text-accent shadow-[0_0_20px_rgba(21,171,190,0.8)]" />
          </div>
          <h3 className="text-3xl font-black text-text-primary mb-4 uppercase">Protocol Initiated</h3>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your strategy matrix has been transmitted to Growsphere Intel. Our growth analysts will architect your trajectory and contact you shortly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={reset}
              className="w-full sm:w-auto px-12 py-5 bg-accent text-black font-black uppercase tracking-widest text-xs rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(21,171,190,0.4)] transition-all"
            >
              Return to Base
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
        <div className="text-xs font-black text-text-secondary uppercase tracking-[0.5em] mb-12">
          Global Strategic Network
        </div>
        <div className="w-full relative py-12 overflow-hidden">
           {/* Auto-scrolling Marquee */}
           <motion.div 
            animate={{ x: [0, -1200] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700"
           >
            {['ANDURIL', 'SCALE AI', 'REVOLUT', 'MONZO', 'KLARNA', 'BOLT', 'The Laundry Lady', 'Richter Global', 'Arcee', 'BlueStone'].map((brand, i) => (
              <span key={i} className="font-sans font-black text-4xl tracking-tighter filter grayscale">{brand}</span>
            ))}
            {/* Repeat for seamless loop */}
            {['ANDURIL', 'SCALE AI', 'REVOLUT', 'MONZO', 'KLARNA', 'BOLT', 'The Laundry Lady', 'Richter Global', 'Arcee', 'BlueStone'].map((brand, i) => (
              <span key={i+10} className="font-sans font-black text-4xl tracking-tighter filter grayscale">{brand}</span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: Lock, label: "Secure by Design", desc: "Enterprise-grade security and data protection for all your projects." },
          { icon: MessageCircle, label: "Direct Support", desc: "Direct communication with our senior design and engineering team." },
          { icon: Globe, label: "Global Speed", desc: "Global hosting ensures your apps load instantly for users everywhere." },
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

const FinalCTA = ({ onStart }: { onStart: () => void }) => (
  <section className="py-40 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-accent/5 skew-y-3 origin-right z-0" />
    <div className="container mx-auto max-w-5xl relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card p-20 border-accent/20 bg-accent/5 backdrop-blur-3xl"
      >
        <h2 className="text-4xl md:text-7xl font-black tracking-tight text-text-primary mb-8 uppercase">Build Your Next<br />Big Idea.</h2>
        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Start your transformation today. We are currently accepting only <b>2 new projects</b> this quarter.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Magnetic>
             <button 
              onClick={onStart}
              className="px-14 py-7 bg-accent text-black font-black uppercase tracking-[3px] text-base rounded-xl hover:brightness-110 shadow-[0_0_30px_rgba(21,171,190,0.4)]"
             >
                Start Your Project
             </button>
          </Magnetic>
          <div className="flex flex-col text-left">
             <div className="text-accent font-black text-2xl leading-none">100%</div>
             <div className="text-xs text-text-secondary uppercase tracking-widest mt-2 font-bold">Satisfaction Guarantee</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative pt-32 pb-16 bg-black overflow-hidden border-t border-white/5">
    <div className="absolute inset-0 bg-accent/[0.02] pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand Column */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl shadow-[0_0_20px_rgba(21,171,190,0.5)] flex items-center justify-center">
              <Cpu className="w-6 h-6 text-black" />
            </div>
            <span className="font-sans font-black text-2xl tracking-tighter uppercase text-text-primary">Growsphere</span>
          </div>
          <p className="text-text-secondary text-base leading-relaxed max-w-[280px]">
            The strategic growth partner for founders and enterprises scaleable AI architectures and high-conversion software.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Twitter, href: "#", name: "X" },
              { icon: Linkedin, href: "#", name: "LinkedIn" },
              { icon: Instagram, href: "https://www.instagram.com/growsphereconsulting/", name: "Instagram" }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.href.startsWith('http') ? "_blank" : undefined}
                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                whileHover={{ y: -5, scale: 1.1, backgroundColor: "var(--accent)", color: "#000" }}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 text-text-secondary"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-sans font-black text-xs uppercase tracking-[0.3em] text-accent mb-10">Company</h4>
          <ul className="flex flex-col gap-6">
            {[
              { label: "About Us", href: "#about" },
              { label: "Our Teams", href: "#teams" },
              { label: "Careers", href: "#careers" },
              { label: "Strategic Partners", href: "#partners" }
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-text-secondary hover:text-accent font-sans font-bold text-sm uppercase tracking-widest transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-sans font-black text-xs uppercase tracking-[0.3em] text-accent mb-10">Legal & Support</h4>
          <ul className="flex flex-col gap-6">
            {[
              { label: "Privacy Policy", href: "#privacy" },
              { label: "Terms of Service", href: "#terms" },
              { label: "Contact Us", href: "#contact" },
              { label: "Support Protocol", href: "#support" }
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-text-secondary hover:text-accent font-sans font-bold text-sm uppercase tracking-widest transition-colors text-left block">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-sans font-black text-xs uppercase tracking-[0.3em] text-accent mb-10">Contact Hub</h4>
          <ul className="flex flex-col gap-8">
            <li className="flex items-start gap-4 group">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-text-secondary font-black mb-1">Send Mail</span>
                <span className="text-sm font-bold text-text-primary">growth@growsphere.ai</span>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-text-secondary font-black mb-1">Global HQ</span>
                <span className="text-sm font-bold text-text-primary">Silicon Valley, CA, USA</span>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-text-secondary font-black mb-1">Pulse Support</span>
                <span className="text-sm font-bold text-text-primary">+1 (555) GROW-NOW</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mix-blend-difference">
          © 2026 GROWSPHERE SYSTEM — ALL PROTOCOLS RESERVED.
        </p>
        <div className="flex items-center gap-8">
          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary hover:text-accent transition-colors">System Status: Online</button>
          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary hover:text-accent transition-colors">v.4.0.2</button>
        </div>
      </div>
    </div>
  </footer>
);

const FeatureGrid = () => (
  <section id="services" className="py-40 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-accent/[0.01] pointer-events-none" />
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6"
          >
            Execution Modules
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-text-primary mb-6 leading-[0.85]">SERVICES.</h2>
        </div>
        <p className="text-text-secondary max-w-sm text-lg leading-relaxed font-medium">Deploying <b>Custom Software Solutions</b> and <b>Enterprise AI Architectures</b> that deliver measurable conversion and scaling results.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
        {[
          { title: "AI Solutions", desc: "Smart AI tools and automated agents built to optimize your business workflows.", icon: Sparkles, className: "md:col-span-2 md:row-span-1" },
          { title: "UI/UX Design", desc: "High-end interfaces designed for ease of use and high customer retention.", icon: Layout, className: "md:col-span-1 md:row-span-1" },
          { icon: Zap, title: "Web Apps", desc: "Fast, modern web applications built to scale with your business globally.", accent: true, className: "md:col-span-1 md:row-span-2" },
          { icon: Smartphone, title: "Mobile Apps", desc: "Stunning iOS and Android apps with smooth performance and great design.", className: "md:col-span-2 md:row-span-1" },
          { icon: Database, title: "Cloud Ops", desc: "Secure, reliable cloud systems that scale automatically with your traffic.", className: "md:col-span-1 md:row-span-1" },
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className={cn(
              "p-10 glass-card group cursor-default flex flex-col justify-between overflow-hidden relative border-accent/0 hover:border-accent/40",
              feature.className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <feature.icon className={cn("w-14 h-14 mb-8 transition-all group-hover:text-accent group-hover:scale-125 group-hover:rotate-[15deg]", feature.accent ? "text-accent" : "text-text-secondary")} />
              <h3 className="text-3xl font-black text-text-primary mb-5 tracking-tight transition-colors">{feature.title}</h3>
              <p className="text-text-secondary text-base leading-relaxed transition-colors max-w-[260px]">{feature.desc}</p>
            </div>
            <div className="mt-8 flex justify-end">
               <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
               >
                 <ChevronRight className="w-5 h-5 text-accent" />
               </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: 'AI Solutions',
    budget: '$10k - $25k',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;

    if (!emailRegex.test(formData.email)) {
      alert("Invalid communication channel (email).");
      return;
    }
    if (!phoneRegex.test(formData.mobile)) {
      alert("Invalid mobile nexus (phone number).");
      return;
    }

    setIsSubmitting(true);
    
    const subject = `New Project Inquiry: ${formData.service} - ${formData.name}`;
    const body = `
      Project Inquiry Details:
      -----------------------
      Client Name: ${formData.name}
      Email: ${formData.email}
      Mobile: ${formData.mobile}
      Service Required: ${formData.service}
      Budget Range: ${formData.budget}
      
      Requirements:
      ${formData.requirements}
    `;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.location.href = `mailto:growsphereconsulting@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 1500);
  };

  return (
    <section id="contact-form" className="py-40 relative overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,171,190,0.05),transparent_70%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="lg:w-1/2">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8"
            >
              Inquiry Forge
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-text-primary mb-10 leading-[0.85] uppercase">
              Start Your <br />
              <span className="text-accent">Execution.</span>
            </h2>
            <p className="text-text-secondary text-xl leading-relaxed font-medium mb-12 max-w-lg">
              Deployment starts with clarity. Provide your project parameters, and our growth analysts will architect a custom trajectory within 24 hours.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Direct Line", val: "growth@growsphere.ai", icon: Mail },
                { title: "Global Intel", val: "growsphereconsulting@gmail.com", icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="w-4 h-4 text-accent" />
                    <span className="text-[10px] uppercase tracking-widest font-black text-text-secondary">{item.title}</span>
                  </div>
                  <div className="text-lg font-bold text-text-primary tracking-tight">{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:w-1/2 w-full glass-card p-10 md:p-16 border-accent/20 relative"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                   <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-4 uppercase">Protocol Initiated</h3>
                <p className="text-text-secondary mb-10">We've received your data. Opening your secure mail client to finalize submission...</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-black text-accent uppercase tracking-widest hover:underline"
                >
                  Edit Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest font-black text-text-secondary ml-1">Identity / Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/5 border border-border px-6 py-4 rounded-xl text-text-primary focus:outline-none focus:border-accent transition-all font-bold placeholder:opacity-30"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest font-black text-text-secondary ml-1">Comms / Email</label>
                    <input 
                      required
                      type="email"
                      placeholder="alex@nexus.ai"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/5 border border-border px-6 py-4 rounded-xl text-text-primary focus:outline-none focus:border-accent transition-all font-bold placeholder:opacity-30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest font-black text-text-secondary ml-1">Interface / Mobile</label>
                    <input 
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className="bg-white/5 border border-border px-6 py-4 rounded-xl text-text-primary focus:outline-none focus:border-accent transition-all font-bold placeholder:opacity-30"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest font-black text-text-secondary ml-1">Required Module</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="bg-black border border-border px-6 py-4 rounded-xl text-text-primary focus:outline-none focus:border-accent transition-all font-bold cursor-pointer"
                    >
                      <option>AI Solutions</option>
                      <option>Web Ecosystem</option>
                      <option>Mobile Engineering</option>
                      <option>Cloud Infrastructure</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-black text-text-secondary ml-1">Project Capital / Budget</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="bg-black border border-border px-6 py-4 rounded-xl text-text-primary focus:outline-none focus:border-accent transition-all font-bold cursor-pointer"
                  >
                    <option>$499 - $5k</option>
                    <option>$5k - $25k</option>
                    <option>$25k - $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-black text-text-secondary ml-1">Execution Parameters / Requirements</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe your vision and technical hurdles..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    className="bg-white/5 border border-border px-6 py-4 rounded-xl text-text-primary focus:outline-none focus:border-accent transition-all font-bold placeholder:opacity-30 resize-none"
                  />
                </div>

                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-accent text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl shadow-[0_20px_40px_-10px_rgba(21,171,190,0.4)] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>Submit Inquiry <ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => (
  <section id="about" className="py-40 px-6 relative overflow-hidden">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8"
          >
            Company Profile
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-text-primary mb-10 leading-[0.85] uppercase">
            WE BUILD<br />FOR THE<br /><span className="text-accent italic">BEST.</span>
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-lg">
            Growsphere is a dedicated team of experts focused on high-performance design and engineering. We don't just write code; we help you win your market.
          </p>
          <div className="flex gap-16 mt-8">
            {[
              { val: "12+", label: "Architects" },
              { val: "40+", label: "Ecosystems" },
              { val: "3.2x", label: "Velocity" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black text-text-primary uppercase tracking-tighter">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-accent font-black mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square md:aspect-video rounded-[40px] overflow-hidden border border-border shadow-2xl">
          <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10" />
          <img 
            src="https://picsum.photos/seed/strategic/1200/800" 
            alt="Strategic Forge" 
            className="w-full h-full object-cover grayscale brightness-50 transition-transform duration-1000 hover:scale-110" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-10 left-10 z-20">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Internal Log: 0x482</div>
            <div className="text-sm font-bold text-white/80 uppercase tracking-widest">Expansion Protocol Active</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const IndustriesServed = () => (
  <section id="industries" className="py-40 px-6 border-y border-border relative bg-card-bg/5">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-border/40 hidden lg:block" />
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-20">
        <div className="max-w-md lg:sticky lg:top-40">
           <h2 className="text-[120px] font-black tracking-[-0.08em] text-text-primary leading-none mb-10 opacity-5 dark:opacity-10 uppercase select-none">SECTORS</h2>
           <h3 className="text-4xl font-black text-text-primary tracking-tighter mb-6 uppercase leading-tight">Industries We<br />Serve.</h3>
           <p className="text-text-secondary leading-relaxed font-medium">We deliver expert solutions across high-growth industries that demand top-tier reliability.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border flex-grow max-w-4xl border border-border">
          {[
            { icon: Activity, label: "HealthTech", desc: "Biometric analysis and HIPAA-compliant data routing for unified care planes." },
            { icon: CreditCard, label: "FinTech", desc: "Atomic transaction layers and ledger-ready infrastructure for financial nodes." },
            { icon: ShoppingBag, label: "E-Commerce", desc: "High-conversion commerce engines for 1M+ SKU scale and hyper-retention." },
            { icon: Building2, label: "PropTech", desc: "Real estate visualization and fractional asset management through distributed keys." },
            { icon: Briefcase, label: "SaaS", desc: "Multi-tenant architectures with unified identity planes for global deployment." },
            { icon: Zap, label: "Energy", desc: "Grid-scale optimization and renewable resource tracking via intelligent nodes." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: "var(--bg-accent-soft)" }}
              className="bg-bg p-12 group transition-colors relative"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-500" />
              <item.icon className="w-10 h-10 text-text-secondary group-hover:text-accent mb-8 transition-all group-hover:scale-110" />
              <div className="text-base font-black text-text-primary uppercase tracking-[0.2em] mb-4">{item.label}</div>
              <p className="text-base text-text-secondary leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ClientReviews = () => (
  <section id="reviews" className="py-32 px-6">
    <div className="container mx-auto max-w-[1280px]">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="max-w-2xl text-left">
          <div className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-4">Client Feedback</div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary uppercase leading-none">What Our<br />Clients Say.</h2>
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
                 <div className="text-text-primary font-bold text-base tracking-tight">{review.author}</div>
                 <div className="text-text-secondary text-xs font-bold uppercase tracking-widest">{review.company} // {review.role}</div>
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
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-sans text-6xl md:text-8xl font-black tracking-tighter text-text-primary mb-6 uppercase"
        >
          Pricing.
        </motion.h2>
        <p className="text-text-secondary max-w-lg mx-auto uppercase tracking-[0.3em] text-xs font-black">Simple pricing for world-class quality. Choose your plan.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { name: "Alpha Tier", price: "$499", tier: "Starter", features: ["Launch-Ready Website", "AI-Powered Branding", "Fast 3-Day Delivery"] },
          { name: "Delta Tier", price: "$2,499", tier: "Growth", features: ["Full Software Platform", "Custom API Integration", "Advanced AI Strategy", "14-Day Priority Build"], popular: true },
          { name: "Omega Tier", price: "Custom", tier: "Enterprise", features: ["Enterprise Systems", "iOS & Android Apps", "24/7 Dedicated Support"] },
        ].map((plan, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-12 rounded-[32px] border transition-all duration-700 flex flex-col relative overflow-hidden",
              plan.popular ? "bg-accent border-accent scale-105 z-10 shadow-[0_0_50px_rgba(21,171,190,0.2)]" : "bg-card-bg border-border"
            )}
          >
            {plan.popular && <div className="absolute top-0 right-0 py-1.5 px-6 bg-black text-accent text-xs font-black uppercase tracking-widest rounded-bl-xl">Best Value</div>}
            
            <div className={cn("text-xs font-black uppercase tracking-[0.3em] mb-3", plan.popular ? "text-neutral-800" : "text-accent")}>
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
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
              "w-full py-5 rounded-xl font-sans font-extrabold text-[12px] uppercase tracking-[2px] transition-all",
              plan.popular ? "bg-bg text-text-primary hover:brightness-125 shadow-xl" : "bg-text-primary/[0.05] text-text-primary border border-border hover:bg-accent hover:text-black hover:border-accent"
            )}>
              Select Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

import { ChatAssistant } from './components/ChatAssistant';

// --- Main App ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 w-[2px] h-[30vh] bg-border origin-top z-50 hidden lg:block"
      style={{ scaleY }}
    >
      <div className="absolute inset-0 bg-accent" />
    </motion.div>
  );
};

export default function App() {
  const [section, setSection] = useState<Section>('hero');
  const [step, setStep] = useState<Step>(1);
  const [choices, setChoices] = useState<UserChoices>({ 
    need: '', 
    budget: '', 
    timeline: '',
    name: '',
    email: '',
    mobile: '',
    requirements: ''
  });
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
    if (step < 4) setStep(step + 1 as Step);
    else setSection('preview');
  };
  const resetFlow = () => {
    setSection('hero');
    setStep(1);
    setChoices({ 
      need: '', 
      budget: '', 
      timeline: '',
      name: '',
      email: '',
      mobile: '',
      requirements: ''
    });
  };

  return (
    <div className={cn("min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-black", theme)}>
      <GrainBackground />
      <GlowEffect />
      <MouseSpotlight />
      <ScrollProgress />
      <Navbar toggleTheme={toggleTheme} theme={theme} onStart={startFlow} />

      <main className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {section === 'hero' && (
            <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onStart={startFlow} />
              <div className="mt-[-10vh]">
                <TrustSignals />
                <IndustriesServed />
                <ContactInquiryForm />
                <AboutUs />
                <FeatureGrid />
                <ClientReviews />
                <PricingSection />
                <FinalCTA onStart={startFlow} />
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

