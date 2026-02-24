/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  Pause, 
  Menu, 
  X, 
  ArrowRight,
  ChevronRight,
  Zap,
  Star,
  MessageSquare,
  Headphones,
  Clock,
  BarChart3,
  Users,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const CONTACT_INFO = {
  demoPhone: "(828) 521-8811",
  supportPhone: "1-828-351-3167",
  email: "contact@redsquareapp.com",
  website: "redsquareapp.com",
  bookingUrl: "https://cal.com/redsquareapp/ai"
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "AI Receptionist", href: "/#ai-receptionist" },
    { label: "ROI Calculator", href: "/#roi" },
    { label: "Contact", href: "/#contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-slate-800">RedSquare AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="text-slate-600 hover:text-red-600 font-medium transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${CONTACT_INFO.supportPhone.replace(/-/g, "")}`} className="text-slate-600 hover:text-red-600 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {CONTACT_INFO.supportPhone}
            </a>
            <a href={CONTACT_INFO.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white px-6 py-3 rounded-full font-heading font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/30">
              Book a Demo
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-red-600 font-medium py-2 text-lg">
                  {link.label}
                </a>
              ))}
              <a href={CONTACT_INFO.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block bg-red-500 text-white px-6 py-4 rounded-xl font-heading font-semibold text-center text-lg">
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface AudioDemoProps {
  title: string;
  description: string;
  isPlaying: boolean;
  onToggle: () => void;
  audioUrl: string;
}

const AudioDemoCard: React.FC<AudioDemoProps> = ({ title, description, isPlaying, onToggle, audioUrl }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      audioRef.current.onended = () => onToggle();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying, audioUrl, onToggle]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <button 
          onClick={onToggle}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isPlaying ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600'}`}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-lg text-slate-800">{title}</h4>
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-1 h-8">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ height: isPlaying ? `${20 + Math.random() * 80}%` : '20%' }}
            transition={{ duration: 0.2, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse', delay: i * 0.05 }}
            className={`flex-1 rounded-full transition-colors duration-300 ${isPlaying ? 'bg-red-500' : 'bg-slate-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ROICalculator = () => {
  const [calls, setCalls] = useState(200);
  const [missRate, setMissRate] = useState(20);
  const [value, setValue] = useState(150);

  const monthlyLost = Math.round(calls * (missRate / 100) * value);
  const yearlyLost = monthlyLost * 12;
  const recoverable = Math.round(yearlyLost * 0.7);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
      <div className="text-center mb-12">
        <h3 className="font-heading font-bold text-3xl md:text-4xl">Calculate Your Lost Revenue</h3>
        <p className="text-slate-300 mt-3 text-lg">See how much you're losing from missed calls every year</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            Calls Per Month: <span className="text-red-400 font-bold text-xl ml-2">{calls}</span>
          </label>
          <input 
            type="range" min="50" max="1000" step="10" value={calls} 
            onChange={(e) => setCalls(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>50</span>
            <span>1000</span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            Missed Call Rate: <span className="text-red-400 font-bold text-xl ml-2">{missRate}%</span>
          </label>
          <input 
            type="range" min="5" max="50" step="1" value={missRate} 
            onChange={(e) => setMissRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>5%</span>
            <span>50%</span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            Avg. Customer Value: <span className="text-emerald-400 font-bold text-xl ml-2">${value}</span>
          </label>
          <input 
            type="range" min="50" max="500" step="10" value={value} 
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$50</span>
            <span>$500</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/5">
          <p className="text-slate-400 text-sm mb-1">Monthly Lost Revenue</p>
          <p className="font-heading font-bold text-3xl text-red-400">${monthlyLost.toLocaleString()}</p>
        </div>
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/5">
          <p className="text-slate-400 text-sm mb-1">Yearly Lost Revenue</p>
          <p className="font-heading font-bold text-3xl text-red-400">${yearlyLost.toLocaleString()}</p>
        </div>
        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-500/30">
          <p className="text-emerald-300 text-sm font-medium mb-1">Recoverable with AI</p>
          <p className="font-heading font-bold text-4xl text-emerald-400">${recoverable.toLocaleString()}<span className="text-lg font-medium">/yr</span></p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-2xl">RedSquare AI</span>
          </div>
          <p className="text-slate-400 mb-8 max-w-md text-lg leading-relaxed">
            Your 24/7 AI Receptionist that never misses a call. Capture every lead, book appointments, and grow your business while you focus on what matters.
          </p>
          <div className="space-y-3 text-slate-400">
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-500" />
              <span>Support: {CONTACT_INFO.supportPhone}</span>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-red-500" />
              <span>{CONTACT_INFO.email}</span>
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-heading font-bold text-lg mb-6">Product</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#features" className="hover:text-red-400 transition-colors">Features</a></li>
            <li><a href="#ai-receptionist" className="hover:text-red-400 transition-colors">AI Receptionist</a></li>
            <li><a href="#roi" className="hover:text-red-400 transition-colors">ROI Calculator</a></li>
            <li><a href="#contact" className="hover:text-red-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-heading font-bold text-lg mb-6">Legal</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/privacy-policy" className="hover:text-red-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/refund-policy" className="hover:text-red-400 transition-colors">Refund Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-red-400 transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Lock className="w-5 h-5 text-emerald-500" />
            <span>SOC 2 Certified</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} RedSquare AI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const LandingPage = () => {
  const [activeAudio, setActiveAudio] = useState<number | null>(null);

  const features = [
    { icon: Phone, title: "Never Miss a Call", desc: "Every call is answered instantly, 24/7/365. No hold times, no voicemail purgatory, no lost leads." },
    { icon: MessageSquare, title: "Natural Conversations", desc: "Advanced AI understands context and responds naturally. Customers feel like they're talking to a real person." },
    { icon: Calendar, title: "Smart Scheduling", desc: "AI checks your availability in real-time and books appointments directly into your calendar." },
    { icon: Zap, title: "SMS Follow-ups", desc: "Send confirmation texts, reminders, and follow-ups automatically. Reduce no-shows by 60%." },
    { icon: Users, title: "Intelligent Routing", desc: "Urgent calls get routed to you immediately. Routine inquiries are handled automatically." },
    { icon: ShieldCheck, title: "Secure & Compliant", desc: "HIPAA-compliant technology keeps your customer data safe and secure at all times." }
  ];

  const audioDemos = [
    { 
      title: "Appointment Booking", 
      desc: "AI naturally schedules appointments while capturing all necessary information.",
      url: "/audio/8f8326.wav"
    },
    { 
      title: "Lead Qualification", 
      desc: "Smart questioning to identify and prioritize serious prospects.",
      url: "/audio/e1bf1f48.wav"
    },
    { 
      title: "After-Hours Reception", 
      desc: "Never miss a call again, even when your office is closed.",
      url: "/audio/customer-demo.mp3"
    }
  ];

  return (
    <div className="bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-b from-red-50/50 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm">
                <Zap size={16} className="fill-current" />
                <span>AI-Powered Receptionist</span>
              </div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight">
                Never Miss a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Call Again</span>
              </h1>
              <p className="text-xl text-slate-600 mt-8 leading-relaxed max-w-xl">
                Your 24/7 AI Receptionist captures every lead, books appointments, and answers questions instantly. Stop losing customers to missed calls.
              </p>
              
              <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mt-10 shadow-sm max-w-lg">
                <p className="text-sm text-red-600 font-bold mb-2 uppercase tracking-wider">Try Our AI Receptionist Now:</p>
                <a href={`tel:${CONTACT_INFO.demoPhone.replace(/[()-\s]/g, "")}`} className="text-3xl font-bold text-red-600 hover:text-red-700 flex items-center gap-3 transition-colors">
                  <Phone className="w-8 h-8 fill-current" />
                  {CONTACT_INFO.demoPhone}
                </a>
                <p className="text-xs text-red-400 mt-2 font-medium">Call to experience our AI receptionist in action</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href={CONTACT_INFO.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white px-10 py-5 rounded-full font-heading font-bold text-lg hover:bg-red-600 transition-all duration-300 shadow-xl shadow-red-500/30 flex items-center justify-center gap-2">
                  Book a Demo <ArrowRight size={20} />
                </a>
                <a href="#features" className="border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-full font-heading font-bold text-lg hover:border-red-500 hover:text-red-600 transition-all duration-300 flex items-center justify-center gap-2">
                  See Features
                </a>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-red-200 to-red-300 border-4 border-white flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-current" />)}
                  </div>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Trusted by 500+ businesses</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-[3rem] blur-3xl opacity-10" />
              <div className="relative bg-white rounded-[3rem] shadow-2xl p-8 border border-slate-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <h3 className="font-heading font-bold text-xl text-slate-800">AI Receptionist Dashboard</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm text-red-600 font-bold uppercase tracking-widest">Live</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-5 border border-red-100/50">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Incoming Call</span>
                      </div>
                      <p className="text-sm text-slate-600 italic pl-14 leading-relaxed">
                        "Hi, I'd like to book an appointment for a cleaning..."
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-5 border border-slate-100 ml-8">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-slate-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">AI Response</span>
                      </div>
                      <p className="text-sm text-slate-600 italic pl-14 leading-relaxed">
                        "I'd be happy to help you schedule that. What day works best for you this week?"
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-bold uppercase tracking-widest">Today's Performance</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Calls Answered</p>
                        <p className="text-2xl font-bold">47</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Booked</p>
                        <p className="text-2xl font-bold text-red-500">12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-900">Your AI Receptionist Handles It All</h2>
            <p className="text-xl text-slate-500 mt-6">A complete virtual receptionist that works while you sleep</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50 rounded-[2.5rem] p-10 hover:shadow-2xl hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-8 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <f.icon size={32} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Demos */}
      <section id="ai-receptionist" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-900">Hear RedSquare AI In Action</h2>
            <p className="text-xl text-slate-500 mt-6">Listen to how our AI receptionist handles real conversations</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {audioDemos.map((demo, i) => (
              <AudioDemoCard 
                key={i}
                title={demo.title}
                description={demo.desc}
                audioUrl={demo.url}
                isPlaying={activeAudio === i}
                onToggle={() => setActiveAudio(activeAudio === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-900">How Much Are Missed Calls Costing You?</h2>
            <p className="text-xl text-slate-500 mt-6">Use our calculator to see the revenue you could be recovering</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-900">Get Started Today</h2>
            <p className="text-xl text-slate-500 mt-6">Ready to never miss another call? Let's talk.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-10 text-center hover:shadow-2xl transition-all group">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                <Phone size={36} />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">Sales Inquiries</h3>
              <a href={`tel:${CONTACT_INFO.supportPhone.replace(/-/g, "")}`} className="text-red-600 font-bold text-xl hover:underline">
                {CONTACT_INFO.supportPhone}
              </a>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-10 text-center hover:shadow-2xl transition-all group">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                <Mail size={36} />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">Email Us</h3>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-red-600 font-bold text-xl hover:underline break-all">
                {CONTACT_INFO.email}
              </a>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-10 text-center hover:shadow-2xl transition-all group">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                <Calendar size={36} />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">Book a Demo</h3>
              <a href={CONTACT_INFO.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold text-xl hover:underline">
                Schedule Demo Call
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PolicyPage = ({ title, content }: { title: string, content: React.ReactNode }) => (
  <div className="bg-white min-h-screen">
    <Navbar />
    <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 mb-12">{title}</h1>
        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
          <p className="text-sm text-slate-400 mb-12">Last updated: February 2025</p>
          {content}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={
          <PolicyPage 
            title="Privacy Policy" 
            content={
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                  <p>RedSquare AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, disclosed, and safeguarded by us.</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                  <p>We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Contact information (name, email, phone number)</li>
                    <li>Business information (company name, address)</li>
                    <li>Communication content (call recordings, transcripts)</li>
                    <li>Usage data and analytics</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">3. HIPAA Compliance</h2>
                  <p>RedSquare AI is HIPAA compliant. We have implemented appropriate safeguards to ensure the protection of health information in accordance with HIPAA regulations.</p>
                </section>
              </div>
            } 
          />
        } />
        <Route path="/refund-policy" element={
          <PolicyPage 
            title="Refund Policy" 
            content={
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">1. 30-Day Money-Back Guarantee</h2>
                  <p>We offer a 30-day money-back guarantee for new customers. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund.</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Subscription Billing</h2>
                  <p>RedSquare AI offers monthly and annual subscription plans. Subscriptions are automatically renewed unless cancelled at least 7 days before the end of the billing period.</p>
                </section>
              </div>
            } 
          />
        } />
        <Route path="/terms-conditions" element={
          <PolicyPage 
            title="Terms & Conditions" 
            content={
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                  <p>By accessing and using RedSquare AI's services, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Service Description</h2>
                  <p>RedSquare AI provides AI-powered receptionist services, including call handling, appointment scheduling, lead qualification, and customer communication automation.</p>
                </section>
              </div>
            } 
          />
        } />
      </Routes>
    </Router>
  );
}
