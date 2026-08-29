import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, Lock, ExternalLink, RefreshCw, Smartphone, Zap, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import { CpaOffer, CpaConfig } from '../types';
import { DEFAULT_CPA_OFFERS, USER_TARGET_CPA_URL } from '../data/mockData';

interface CpaLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  followerCount: number;
  includeViews: boolean;
  cpaConfig: CpaConfig;
  onSuccessClaim: () => void;
}

export const CpaLockerModal: React.FC<CpaLockerModalProps> = ({
  isOpen,
  onClose,
  username,
  followerCount,
  includeViews,
  cpaConfig,
  onSuccessClaim,
}) => {
  const [offers] = useState<CpaOffer[]>(DEFAULT_CPA_OFFERS);
  const [clickedOfferId, setClickedOfferId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes timer
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  // 5 minute countdown timer for urgency
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // Get current active CPA destination URL with sub-id tracking
  const getCpaDestinationUrl = (offerIndex?: number) => {
    let baseUrl = cpaConfig.cpaUrl || USER_TARGET_CPA_URL;

    // Support specific offer override if configured
    if (offerIndex === 1 && cpaConfig.offer1Url) baseUrl = cpaConfig.offer1Url;
    if (offerIndex === 2 && cpaConfig.offer2Url) baseUrl = cpaConfig.offer2Url;
    if (offerIndex === 3 && cpaConfig.offer3Url) baseUrl = cpaConfig.offer3Url;

    // Inject username dynamically if sub5 placeholder exists
    if (baseUrl.includes('s1SUBID1HERE') && username) {
      const cleanUser = encodeURIComponent(username.replace('@', ''));
      baseUrl = baseUrl.replace('s1SUBID1HERE', cleanUser);
    }
    return baseUrl;
  };

  const handleOfferClick = (offerId: string, index: number) => {
    setClickedOfferId(offerId);
    setClickCount((prev) => prev + 1);

    const targetUrl = getCpaDestinationUrl(index + 1);

    // Open target CPA smartlink
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // Simulate verification polling
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 5000);
  };

  const handleClaimNowDirect = () => {
    setClickCount((prev) => prev + 1);
    const targetUrl = getCpaDestinationUrl();
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100"
        id="cpa-locker-modal"
      >
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-[#fe2c55] via-pink-600 to-[#25f4ee] p-4 text-center text-white relative">
          <div className="flex items-center justify-center gap-2 mb-1">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span className="text-sm uppercase tracking-widest font-black">Human Verification Required</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black">Final Step: Complete Verification</h2>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* Target User Summary Pill */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#fe2c55] to-[#25f4ee] flex items-center justify-center font-bold text-white shadow">
                {username ? username.charAt(1).toUpperCase() : 'T'}
              </div>
              <div>
                <p className="text-xs text-slate-400">Account Target</p>
                <p className="text-sm font-bold text-white">{username || '@your_tiktok'}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" />
                +{followerCount.toLocaleString()} Followers
              </span>
              {includeViews && (
                <p className="text-[10px] text-cyan-400 mt-1">+25,000 Free Views</p>
              )}
            </div>
          </div>

          {/* Urgency Alert & Timer */}
          <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Your queue spot is reserved for:</span>
            </div>
            <div className="font-mono text-base font-black px-2 py-0.5 bg-amber-500/20 rounded border border-amber-500/40 text-amber-200">
              {formattedTime}
            </div>
          </div>

          {/* Instructions Box */}
          <div className="space-y-1.5 text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#25f4ee]" />
              Why is this required?
            </p>
            <p className="text-slate-400 leading-relaxed">
              To prevent automated bots and server abuse, complete <span className="text-white font-bold">ONE free sponsor verification</span> below. Once completed, your followers will be queued and sent immediately.
            </p>
          </div>

          {/* Quick Direct Action Button (Smartlink Primary CTA) */}
          <div className="pt-1">
            <a
              href={getCpaDestinationUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClaimNowDirect}
              className="w-full relative group overflow-hidden flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-black text-base text-white bg-gradient-to-r from-[#fe2c55] to-pink-600 hover:from-pink-600 hover:to-[#fe2c55] shadow-lg shadow-[#fe2c55]/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              id="cpa-primary-direct-cta"
            >
              <Zap className="w-5 h-5 fill-white animate-bounce" />
              <span>VERIFY NOW & DELIVER FOLLOWERS</span>
              <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100" />
            </a>
          </div>

          {/* OR Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink mx-3 text-xs uppercase tracking-wider text-slate-400 font-semibold">Or Choose a Verification Method</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>

          {/* Offers List */}
          <div className="space-y-3">
            {offers.map((offer, idx) => {
              const isClicked = clickedOfferId === offer.id;
              return (
                <div
                  key={offer.id}
                  onClick={() => handleOfferClick(offer.id, idx)}
                  className={`group relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isClicked
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md shadow-emerald-900/20'
                      : offer.isPopular
                      ? 'bg-slate-800/90 border-[#25f4ee]/40 hover:border-[#25f4ee] hover:bg-slate-800'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                  id={`cpa-offer-item-${idx + 1}`}
                >
                  {offer.isPopular && (
                    <span className="absolute -top-2.5 right-4 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-gradient-to-r from-[#25f4ee] to-cyan-500 text-black shadow">
                      ⭐ Recommended
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-700/60 text-cyan-400 group-hover:text-white group-hover:bg-[#fe2c55] transition-colors shrink-0 mt-0.5">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#25f4ee] transition-colors flex items-center gap-1.5">
                        {offer.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{offer.description}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                        <span className="text-emerald-400 font-medium">{offer.rewardText}</span>
                        <span>•</span>
                        <span>Est: {offer.timeEstimate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    <button 
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-700 text-white group-hover:bg-[#fe2c55] group-hover:text-white transition-all shadow flex items-center gap-1.5"
                    >
                      <span>Start</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification Status Feedback / Poller */}
          {clickCount > 0 && (
            <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#25f4ee] animate-spin" />
                <span className="text-slate-300">
                  Checking completion status in the background...
                </span>
              </div>
              <button
                onClick={onSuccessClaim}
                className="text-[11px] font-bold text-[#25f4ee] hover:underline cursor-pointer"
                title="If you already finished the offer"
              >
                I completed it
              </button>
            </div>
          )}

          {/* Disclaimer Bottom */}
          <div className="text-[11px] text-center text-slate-500 pt-2 border-t border-slate-800">
            <p>100% Secure • Safe & Encrypted Delivery • Instant Algorithm Processing</p>
          </div>
        </div>

        {/* Close / Cancel Button */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Locked ID: #TK-849204</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white underline transition-colors"
          >
            Cancel & Return
          </button>
        </div>
      </div>
    </div>
  );
};
