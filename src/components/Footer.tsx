import React from 'react';
import { Flame, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSettings: () => void;
  onScrollToGenerator: () => void;
  onScrollToTools: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSettings,
  onScrollToGenerator,
  onScrollToTools,
}) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-[#fe2c55] text-xs">
              TT
            </div>
            <span className="font-bold text-sm text-white">
              TikTok<span className="text-[#fe2c55]">Booster</span> Pro
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Viral Growth Hub 2026</span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button onClick={onScrollToGenerator} className="hover:text-white transition-colors">
              Follower Booster
            </button>
            <button onClick={onScrollToTools} className="hover:text-white transition-colors">
              Growth Tools
            </button>
            <a href="#faq-section" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#reviews-section" className="hover:text-white transition-colors">
              Reviews
            </a>
            <button onClick={onOpenSettings} className="text-cyan-400 hover:underline">
              CPA Smartlink Settings
            </button>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="pt-4 border-t border-slate-900/80 text-[11px] text-slate-500 leading-relaxed text-center sm:text-left space-y-1">
          <p>
            Disclaimer: This website is an independent third-party analytics and promotional booster tool. TikTok is a registered trademark of ByteDance Ltd. We are not affiliated with or endorsed by TikTok or ByteDance.
          </p>
          <p className="flex items-center justify-center sm:justify-start gap-1">
            <span>Built with highest security standards for content creators worldwide.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
