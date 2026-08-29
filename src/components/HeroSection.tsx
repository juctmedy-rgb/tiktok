import React from 'react';
import { Sparkles, ShieldCheck, Flame, Users, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onScrollToGenerator: () => void;
  onScrollToTools: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToGenerator,
  onScrollToTools,
}) => {
  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-gradient-to-tr from-[#fe2c55]/20 to-[#25f4ee]/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Updated for 2026 TikTok FYP Algorithm</span>
          <span className="text-[#fe2c55] font-black">•</span>
          <span className="text-[#25f4ee] font-bold">100% Free & No Password</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
          Explode Your TikTok with <br />
          <span className="bg-gradient-to-r from-[#25f4ee] via-white to-[#fe2c55] bg-clip-text text-transparent">
            Real Followers & Viral Reach
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          Access high-powered TikTok growth tools: instantly queue up to <strong className="text-white font-bold">10,000 real followers</strong>, discover secret viral hashtags, analyze engagement rates, and trigger the FYP algorithm.
        </p>

        {/* Value Props Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 pt-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Password Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Fast CDN Queue Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#fe2c55]" />
            <span>Real Algorithm Retention</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onScrollToGenerator}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-base text-white bg-gradient-to-r from-[#fe2c55] to-pink-600 hover:from-pink-600 hover:to-[#fe2c55] shadow-xl shadow-[#fe2c55]/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            id="hero-cta-boost"
          >
            <Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>Start Follower Booster</span>
          </button>
          
          <button
            onClick={onScrollToTools}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm text-slate-200 bg-slate-800/90 border border-slate-700 hover:bg-slate-700/80 hover:text-white transition-all flex items-center justify-center gap-2"
            id="hero-cta-tools"
          >
            <Flame className="w-4 h-4 text-[#25f4ee]" />
            <span>Explore Viral Tools</span>
          </button>
        </div>

        {/* Social Proof Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-4xl mx-auto">
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <p className="text-xl sm:text-2xl font-black text-white">4.8M+</p>
            <p className="text-xs text-slate-400">Followers Delivered</p>
          </div>
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <p className="text-xl sm:text-2xl font-black text-[#25f4ee]">100%</p>
            <p className="text-xs text-slate-400">Safe & Compliant</p>
          </div>
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <p className="text-xl sm:text-2xl font-black text-[#fe2c55]">92.4%</p>
            <p className="text-xs text-slate-400">FYP Viral Rate</p>
          </div>
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <p className="text-xl sm:text-2xl font-black text-amber-400">4.9/5</p>
            <p className="text-xs text-slate-400">Creator Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};
