import React from 'react';
import { Flame, Sparkles, Shield, Zap, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onScrollToGenerator: () => void;
  onScrollToTools: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onScrollToGenerator,
  onScrollToTools,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-black border border-slate-700 shadow-lg shadow-[#fe2c55]/20 overflow-hidden">
            {/* TikTok Style Visual Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#fe2c55] via-pink-500 to-[#25f4ee] opacity-75 blur-sm"></div>
            <div className="relative w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
              <span className="font-black text-lg bg-gradient-to-r from-[#25f4ee] to-[#fe2c55] bg-clip-text text-transparent">
                TT
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-white">
                TikTok<span className="text-[#fe2c55]">Booster</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-[#25f4ee]/20 text-[#25f4ee] border border-[#25f4ee]/30">
                PRO 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Free Growth & Algorithm Tools</p>
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button 
            onClick={onScrollToGenerator}
            className="hover:text-[#fe2c55] transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-4 h-4 text-[#fe2c55]" />
            Follower Booster
          </button>
          <button 
            onClick={onScrollToTools}
            className="hover:text-[#25f4ee] transition-colors flex items-center gap-1"
          >
            <Flame className="w-4 h-4 text-[#25f4ee]" />
            Viral Hashtags & Tools
          </button>
          <a 
            href="#faq-section"
            className="hover:text-white transition-colors"
          >
            FAQ
          </a>
          <a 
            href="#reviews-section"
            className="hover:text-white transition-colors"
          >
            Reviews
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            title="CPA Smartlink & Webmaster Settings"
            id="open-cpa-settings-btn"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={onScrollToGenerator}
            className="relative group px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#fe2c55] to-pink-600 hover:from-pink-600 hover:to-[#fe2c55] shadow-md shadow-[#fe2c55]/25 transition-all duration-200 flex items-center gap-2"
            id="header-cta-get-followers"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Get Followers</span>
          </button>
        </div>
      </div>
    </header>
  );
};
