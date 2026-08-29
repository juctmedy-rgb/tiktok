import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, ShieldCheck, CheckCircle2, RefreshCw, AlertCircle, TrendingUp, Eye, Heart, UserPlus, Server } from 'lucide-react';

interface FollowerGeneratorProps {
  onStartVerification: (data: { username: string; followers: number; includeViews: boolean }) => void;
}

const FOLLOWER_TIERS = [
  { amount: 1000, label: '1,000', badge: 'Starter', popular: false },
  { amount: 2500, label: '2,500', badge: 'Fast Growth', popular: false },
  { amount: 5000, label: '5,000', badge: '🔥 Most Popular', popular: true },
  { amount: 10000, label: '10,000', badge: '⚡ VIP Creator', popular: false },
];

export const FollowerGenerator: React.FC<FollowerGeneratorProps> = ({ onStartVerification }) => {
  const [username, setUsername] = useState('');
  const [selectedTier, setSelectedTier] = useState<number>(5000);
  const [includeViews, setIncludeViews] = useState<boolean>(true);
  const [enableFypSignal, setEnableFypSignal] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Generation Simulation Stages
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [stage, setStage] = useState<'idle' | 'connecting' | 'verifying_user' | 'allocating_nodes' | 'ready_for_cpa'>('idle');

  const handleStartProcess = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim();

    if (!cleanUser) {
      setErrorMsg('Please enter your TikTok username.');
      return;
    }

    if (cleanUser.length < 2) {
      setErrorMsg('Username must be at least 2 characters long.');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);
    setProgressPercent(0);
    setStage('connecting');
    setStatusMessage('Connecting to TikTok secure CDN node...');

    // Simulation steps to create hyper-engaging real-feel experience
    const timeline = [
      { progress: 25, stage: 'connecting', msg: 'Querying public TikTok profile directory...' },
      { progress: 50, stage: 'verifying_user', msg: `Found profile @${cleanUser.replace('@', '')} (Status: Active & Valid)` },
      { progress: 75, stage: 'allocating_nodes', msg: `Allocating ${selectedTier.toLocaleString()} organic follower nodes & FYP boosts...` },
      { progress: 95, stage: 'allocating_nodes', msg: 'Securing dedicated server bandwidth slots...' },
      { progress: 100, stage: 'ready_for_cpa', msg: 'Followers staged in queue! Final human verification needed.' },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < timeline.length) {
        setProgressPercent(timeline[step].progress);
        setStage(timeline[step].stage as any);
        setStatusMessage(timeline[step].msg);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          onStartVerification({
            username: cleanUser.startsWith('@') ? cleanUser : `@${cleanUser}`,
            followers: selectedTier,
            includeViews,
          });
        }, 800);
      }
    }, 900);
  };

  return (
    <section id="generator-section" className="py-8 sm:py-12 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Main Card */}
        <div className="relative bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Card Top Border Glow */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#fe2c55] to-transparent"></div>

          {/* Section Heading */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fe2c55]/10 border border-[#fe2c55]/30 text-[#fe2c55] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Follower Injection Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Instant TikTok Follower Booster
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
              Select your follower package, enter your username, and let our 2026 organic routing network deliver to your account.
            </p>
          </div>

          {/* Generator Form or Live Processing State */}
          {!isProcessing ? (
            <form onSubmit={handleStartProcess} className="space-y-6" id="follower-generator-form">
              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="tiktok-username-input" className="block text-xs sm:text-sm font-bold text-slate-200">
                  TikTok Username (@username)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-base">
                    @
                  </div>
                  <input
                    id="tiktok-username-input"
                    type="text"
                    value={username.startsWith('@') ? username.substring(1) : username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="your_username"
                    className="w-full pl-9 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-medium focus:outline-none focus:border-[#fe2c55] focus:ring-2 focus:ring-[#fe2c55]/20 transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Follower Package Selection */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-slate-200">
                  Choose Follower Quantity:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FOLLOWER_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.amount;
                    return (
                      <button
                        type="button"
                        key={tier.amount}
                        onClick={() => setSelectedTier(tier.amount)}
                        className={`relative p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-[#fe2c55] ring-2 ring-[#fe2c55]/30 shadow-lg shadow-[#fe2c55]/10'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                        id={`tier-select-${tier.amount}`}
                      >
                        {tier.badge && (
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${
                              tier.popular
                                ? 'bg-[#fe2c55] text-white shadow'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {tier.badge}
                          </span>
                        )}
                        <span className="text-lg sm:text-xl font-black text-white">
                          +{tier.label}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Followers
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Addon Checkboxes */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Complimentary 2026 Boost Features
                </p>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={includeViews}
                    onChange={(e) => setIncludeViews(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#fe2c55] bg-slate-900 border-slate-700 focus:ring-[#fe2c55] focus:ring-offset-slate-900"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#25f4ee] transition-colors">
                      <Eye className="w-3.5 h-3.5 text-[#25f4ee]" />
                      <span>Add +25,000 Bonus Video Views (Free)</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Distributes views across your latest 3 videos to maintain healthy engagement ratio.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={enableFypSignal}
                    onChange={(e) => setEnableFypSignal(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#fe2c55] bg-slate-900 border-slate-700 focus:ring-[#fe2c55] focus:ring-offset-slate-900"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#fe2c55] transition-colors">
                      <Zap className="w-3.5 h-3.5 text-[#fe2c55]" />
                      <span>Enable FYP High-Velocity Algorithm Signal</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Simulates high watch-time completion signals for faster organic recommendation.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-black text-base text-white bg-gradient-to-r from-[#fe2c55] via-pink-600 to-[#25f4ee] hover:opacity-95 shadow-xl shadow-[#fe2c55]/20 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                id="generator-submit-button"
              >
                <Zap className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
                <span>GENERATE +{selectedTier.toLocaleString()} FOLLOWERS NOW</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  No Password Required
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Server className="w-4 h-4 text-[#25f4ee]" />
                  256-Bit SSL Encrypted
                </span>
              </div>
            </form>
          ) : (
            /* Realtime Simulation Progress Screen */
            <div className="py-8 space-y-6 text-center animate-fadeIn" id="generator-processing-state">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-[#fe2c55] border-t-transparent animate-spin"
                ></div>
                <Zap className="w-8 h-8 text-[#25f4ee] animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">
                  {stage === 'connecting' && 'Connecting to TikTok Network...'}
                  {stage === 'verifying_user' && 'Validating Profile Credentials...'}
                  {stage === 'allocating_nodes' && 'Allocating Follower Delivery Queue...'}
                  {stage === 'ready_for_cpa' && 'Verification Checkpoint...'}
                </h3>
                <p className="text-sm text-slate-300 font-mono">
                  {statusMessage}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto space-y-1.5">
                <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#25f4ee] via-pink-500 to-[#fe2c55] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>Target: @{username.replace('@', '')}</span>
                  <span>{progressPercent}% Complete</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl max-w-sm mx-auto text-xs text-slate-400">
                🔒 Establishing secure proxy tunnel to prevent TikTok account rate limits.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
