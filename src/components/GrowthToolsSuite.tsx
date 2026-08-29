import React, { useState } from 'react';
import { 
  Flame, 
  Calculator, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Share2, 
  Heart, 
  MessageCircle, 
  Eye, 
  Lightbulb, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { HASHTAG_SETS, VIRAL_HOOKS } from '../data/mockData';
import { HashtagSet, ViralHook } from '../types';

interface GrowthToolsSuiteProps {
  onTriggerGenerator: () => void;
}

export const GrowthToolsSuite: React.FC<GrowthToolsSuiteProps> = ({ onTriggerGenerator }) => {
  const [activeTab, setActiveTab] = useState<'hashtags' | 'calculator' | 'hooks' | 'schedule'>('hashtags');

  // Hashtag tool states
  const [selectedCategory, setSelectedCategory] = useState<string>(HASHTAG_SETS[0].category);
  const [copiedCategory, setCopiedCategory] = useState<string | null>(null);

  // Engagement calculator states
  const [calcFollowers, setCalcFollowers] = useState<string>('25000');
  const [calcLikes, setCalcLikes] = useState<string>('4200');
  const [calcComments, setCalcComments] = useState<string>('310');
  const [calcShares, setCalcShares] = useState<string>('180');
  const [calcViews, setCalcViews] = useState<string>('65000');

  // Copied hook state
  const [copiedHookId, setCopiedHookId] = useState<string | null>(null);

  const activeHashtagSet = HASHTAG_SETS.find((h) => h.category === selectedCategory) || HASHTAG_SETS[0];

  const handleCopyHashtags = (tags: string[], category: string) => {
    const text = tags.join(' ');
    navigator.clipboard.writeText(text);
    setCopiedCategory(category);
    setTimeout(() => setCopiedCategory(null), 2500);
  };

  const handleCopyHook = (hook: ViralHook) => {
    navigator.clipboard.writeText(hook.hookText);
    setCopiedHookId(hook.id);
    setTimeout(() => setCopiedHookId(null), 2000);
  };

  // Calculate Engagement Rate
  const numFollowers = parseFloat(calcFollowers) || 1;
  const numLikes = parseFloat(calcLikes) || 0;
  const numComments = parseFloat(calcComments) || 0;
  const numShares = parseFloat(calcShares) || 0;
  const totalInteractions = numLikes + numComments + numShares;

  const engagementByFollowers = ((totalInteractions / numFollowers) * 100).toFixed(2);
  const numViews = parseFloat(calcViews) || 1;
  const engagementByViews = ((totalInteractions / numViews) * 100).toFixed(2);

  // Quality rating based on average engagement
  const rateValue = parseFloat(engagementByFollowers);
  let rateGrade = 'Average';
  let rateColor = 'text-amber-400';
  let rateTip = 'Good baseline, but increasing shares and comments will push you to the For You page.';

  if (rateValue >= 10) {
    rateGrade = '🔥 Viral Superstar';
    rateColor = 'text-emerald-400';
    rateTip = 'Exceptional engagement! Your content has high algorithm resonance.';
  } else if (rateValue >= 5) {
    rateGrade = '✨ High Performance';
    rateColor = 'text-[#25f4ee]';
    rateTip = 'Above TikTok average (which is 3-4%). Ready for substantial scale.';
  } else if (rateValue < 2) {
    rateGrade = 'Needs Boost';
    rateColor = 'text-rose-400';
    rateTip = 'Low engagement. Use the Follower Booster and Viral Hooks to trigger algorithm attention.';
  }

  return (
    <section id="tools-section" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25f4ee]/10 border border-[#25f4ee]/30 text-[#25f4ee] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            TikTok Creator Growth Suite
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Free Viral Creator Tools (2026 Edition)
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Everything you need to master the TikTok algorithm, multiply your views, and optimize every video upload.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('hashtags')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'hashtags'
                ? 'bg-gradient-to-r from-[#fe2c55] to-pink-600 text-white shadow-md shadow-[#fe2c55]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="tab-hashtags-btn"
          >
            <Flame className="w-4 h-4" />
            <span>Trending Hashtags</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-[#fe2c55] to-pink-600 text-white shadow-md shadow-[#fe2c55]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="tab-calc-btn"
          >
            <Calculator className="w-4 h-4" />
            <span>Engagement Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('hooks')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'hooks'
                ? 'bg-gradient-to-r from-[#fe2c55] to-pink-600 text-white shadow-md shadow-[#fe2c55]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="tab-hooks-btn"
          >
            <Sparkles className="w-4 h-4" />
            <span>Viral 2-Second Hooks</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'schedule'
                ? 'bg-gradient-to-r from-[#fe2c55] to-pink-600 text-white shadow-md shadow-[#fe2c55]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="tab-schedule-btn"
          >
            <Clock className="w-4 h-4" />
            <span>Best Posting Times</span>
          </button>
        </div>

        {/* Tab 1: Trending Hashtags */}
        {activeTab === 'hashtags' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#fe2c55]" />
                  Viral Hashtag Sets by Niche
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select your content category to reveal high-performing tags with proven FYP distribution.
                </p>
              </div>

              <button
                onClick={() => handleCopyHashtags(activeHashtagSet.tags, activeHashtagSet.category)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-[#25f4ee] hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shrink-0 shadow"
                id="copy-active-hashtags-btn"
              >
                {copiedCategory === activeHashtagSet.category ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy All Category Tags</span>
                  </>
                )}
              </button>
            </div>

            {/* Category Selector Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {HASHTAG_SETS.map((item) => {
                const isSelected = selectedCategory === item.category;
                return (
                  <button
                    key={item.category}
                    onClick={() => setSelectedCategory(item.category)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-[#25f4ee] text-[#25f4ee] shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {item.categoryNameEn}
                  </button>
                );
              })}
            </div>

            {/* Displayed Tags Grid */}
            <div className="p-5 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400">
                  Estimated Category Reach: <strong className="text-white">{activeHashtagSet.estimatedReach}</strong>
                </span>
                <span className="text-slate-400">
                  Competition Level: <strong className="text-emerald-400">{activeHashtagSet.competition}</strong>
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {activeHashtagSet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-sm font-semibold text-slate-200 hover:text-[#fe2c55] hover:border-[#fe2c55]/50 transition-colors select-all cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
                <span>💡 Tip: Use 3 broad niche tags + 2 hyper-specific content tags in your caption.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Engagement Calculator */}
        {activeTab === 'calculator' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Calculator className="w-5 h-5 text-[#25f4ee]" />
                TikTok Engagement Rate & Score Auditor
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Measure whether your TikTok profile has healthy algorithm retention metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Inputs Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      Total Followers
                    </label>
                    <input
                      type="number"
                      value={calcFollowers}
                      onChange={(e) => setCalcFollowers(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-[#fe2c55]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      Average Video Views
                    </label>
                    <input
                      type="number"
                      value={calcViews}
                      onChange={(e) => setCalcViews(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-[#fe2c55]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#fe2c55]" />
                      Average Likes per Video
                    </label>
                    <input
                      type="number"
                      value={calcLikes}
                      onChange={(e) => setCalcLikes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-[#fe2c55]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                      Average Comments
                    </label>
                    <input
                      type="number"
                      value={calcComments}
                      onChange={(e) => setCalcComments(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-[#fe2c55]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    Average Shares & Saves
                  </label>
                  <input
                    type="number"
                    value={calcShares}
                    onChange={(e) => setCalcShares(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium text-sm focus:outline-none focus:border-[#fe2c55]"
                  />
                </div>
              </div>

              {/* Result Column */}
              <div className="lg:col-span-5 p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Calculated Engagement Rate
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white font-mono">
                      {engagementByFollowers}%
                    </span>
                    <span className={`text-sm font-bold ${rateColor}`}>
                      ({rateGrade})
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Based on total interactions ({totalInteractions.toLocaleString()}) vs follower base.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    Algorithm Recommendation:
                  </span>
                  <p className="text-slate-400">{rateTip}</p>
                </div>

                <button
                  onClick={onTriggerGenerator}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#fe2c55] to-pink-600 hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <span>Boost My Engagement Metrics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Viral Hooks */}
        {activeTab === 'hooks' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                High-Retention 2-Second Video Hooks
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                The first 2 seconds decide 90% of your video’s viral fate. Use these psychological openers on your next post.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VIRAL_HOOKS.map((hook) => {
                const isCopied = copiedHookId === hook.id;
                return (
                  <div
                    key={hook.id}
                    className="p-4 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl space-y-3 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                          {hook.category}
                        </span>
                        <span className="text-[11px] text-cyan-400">Audience: {hook.targetAudience}</span>
                      </div>
                      <p className="text-sm font-bold text-white leading-snug">
                        "{hook.hookText}"
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        <strong className="text-slate-300">Why it works:</strong> {hook.whyItWorks}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyHook(hook)}
                      className="mt-3 w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied Hook!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Hook Script</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Posting Schedule */}
        {activeTab === 'schedule' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#25f4ee]" />
                Best Times to Post on TikTok (Global 2026 Peak Windows)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Aligning your uploads with viewer peak traffic speeds up initial algorithm categorization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2">
                <span className="text-2xl">🌅</span>
                <h4 className="font-bold text-white text-sm">Morning Rush</h4>
                <p className="text-xl font-black text-[#25f4ee]">7:00 AM - 9:30 AM</p>
                <p className="text-xs text-slate-400">
                  Ideal for quick motivators, news recaps, fitness clips, and commute humor.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2">
                <span className="text-2xl">☀️</span>
                <h4 className="font-bold text-white text-sm">Lunch Break Window</h4>
                <p className="text-xl font-black text-amber-400">12:30 PM - 2:30 PM</p>
                <p className="text-xs text-slate-400">
                  High engagement for food recipes, fashion showcases, and short tutorials.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2">
                <span className="text-2xl">🌙</span>
                <h4 className="font-bold text-white text-sm">Prime Evening Window</h4>
                <p className="text-xl font-black text-[#fe2c55]">6:30 PM - 10:00 PM</p>
                <p className="text-xs text-slate-400">
                  The highest watch time of the day. Perfect for storytelling, comedy, gaming & deep vlogs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
