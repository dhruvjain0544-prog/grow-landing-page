import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Calendar, 
  CheckCircle2, 
  MessageCircle,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

// --- Types ---
interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  type?: 'text' | 'options' | 'booking';
  options?: string[];
  slots?: string[];
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_GREETING = "Growsphere Operational Protocol 1.0 initiated. I am the Growth Analyst. To architect your expansion, I need to understand your mission first. What is the core nature of your digital ecosystem?";

const QUALIFYING_STEPS = [
  {
    question: "Excellent. Resource allocation is critical for scaling intensity. What is your estimated capital deployment?",
    options: ["$499 - $5k", "$10k - $25k", "$25k - $100k", "Unlimited Series A+"],
    key: 'budget'
  },
  {
    question: "Manifestation velocity matters. When do you require this reality to be deployed?",
    options: ["ASAP (Blitz)", "4-8 Weeks", "Quarterly Cycle", "Strategic Planning"],
    key: 'timeline'
  },
  {
    question: "Analysis complete. I've prepared a strategic projection for your expansion. Let's schedule a deep-dive growth briefing. Which slot works for your timeline?",
    booking: true,
    slots: ["Mon, 10:00 AM", "Mon, 2:00 PM", "Tue, 11:30 AM", "Wed, 4:00 PM"],
    key: 'booking'
  }
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: INITIAL_GREETING, type: 'options', options: ["Web Ecosystem", "Mobile App", "Enterprise SaaS", "Strategic Infrastructure"] }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (msg: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...msg, id: Math.random().toString(36).substring(7) }]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    addMessage({ role: 'user', content: text });
    setInput('');

    // Logic for qualification or AI fallback
    if (step < QUALIFYING_STEPS.length) {
      setIsTyping(true);
      setTimeout(() => {
        const nextStepData = QUALIFYING_STEPS[step];
        setStep(step + 1);
        addMessage({ 
          role: 'assistant', 
          content: nextStepData.question, 
          type: nextStepData.booking ? 'booking' : 'options',
          options: nextStepData.options,
          slots: nextStepData.slots
        });
        setIsTyping(false);
      }, 1000);
    } else {
      // General Inquiry via Gemini
      setIsTyping(true);
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: text,
          config: {
            systemInstruction: "You are the Growth Analyst for Growsphere Consulting, a futuristic strategy and development agency. Your tone is professional, strategic, and expansion-focused. If the user asks about booking, remind them to use the scheduling tool provided or book a session. Keep answers brief and high-level.",
          }
        });
        addMessage({ role: 'assistant', content: response.text || "Protocol error. Re-initiating." });
      } catch (error) {
        addMessage({ role: 'assistant', content: "External nexus link unstable. Please try again." });
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    handleSend(option);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-24 left-6 z-[100] w-[400px] h-[600px] bg-card-bg border border-white/10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <Cpu className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight">Growth Analyst</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Active Link</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0",
                  msg.role === 'assistant' ? "bg-white/5" : "bg-accent/10"
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-accent" /> : <User className="w-4 h-4 text-accent" />}
                </div>
                <div className="space-y-3 max-w-[80%]">
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'assistant' ? "bg-white/5 text-neutral-300" : "bg-accent text-black font-semibold"
                  )}>
                    {msg.content}
                  </div>

                  {msg.type === 'options' && msg.options && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-neutral-400 hover:border-accent hover:text-white transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.type === 'booking' && msg.slots && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {msg.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleOptionClick(`Confirmed: ${slot}`)}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-accent/10 border border-accent/30 rounded-xl text-[11px] font-bold text-accent hover:bg-accent hover:text-black transition-all"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Type your transmission..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-all"
              />
              <button 
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="absolute right-2 top-1.5 p-2 bg-accent text-black rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-neutral-600" />
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest leading-none">Global Sync Enabled</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
