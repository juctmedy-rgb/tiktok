import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { FollowerGenerator } from './components/FollowerGenerator';
import { GrowthToolsSuite } from './components/GrowthToolsSuite';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CpaLockerModal } from './components/CpaLockerModal';
import { CpaSettingsModal } from './components/CpaSettingsModal';
import { CpaConfig } from './types';
import { USER_TARGET_CPA_URL } from './data/mockData';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'tiktok_cpa_config_v2';

const DEFAULT_CONFIG: CpaConfig = {
  cpaUrl: USER_TARGET_CPA_URL,
  networkName: 'Trcefy Smartlink',
  autoRedirect: false,
  customOfferTitle: 'Complete human sponsor verification to unlock your TikTok followers',
  offer1Url: '',
  offer2Url: '',
  offer3Url: '',
};

export const App: React.FC = () => {
  // CPA Configuration State
  const [cpaConfig, setCpaConfig] = useState<CpaConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default points to user's smart link if unchanged
        if (!parsed.cpaUrl || parsed.cpaUrl.includes('example')) {
          parsed.cpaUrl = USER_TARGET_CPA_URL;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CONFIG;
  });

  // Modal Visibility States
  const [isLockerOpen, setIsLockerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Active Session Target Data
  const [activeSession, setActiveSession] = useState<{
    username: string;
    followers: number;
    includeViews: boolean;
  }>({
    username: '',
    followers: 5000,
    includeViews: true,
  });

  // Success Notification Toast
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const handleSaveConfig = (newConfig: CpaConfig) => {
    setCpaConfig(newConfig);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartVerification = (data: { username: string; followers: number; includeViews: boolean }) => {
    setActiveSession(data);
    setIsLockerOpen(true);
  };

  const handleClaimSuccess = () => {
    setIsLockerOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 8000);
  };

  const scrollToGenerator = () => {
    const el = document.getElementById('generator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTools = () => {
    const el = document.getElementById('tools-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-[#fe2c55] selection:text-white">
      {/* Top Navbar */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onScrollToGenerator={scrollToGenerator}
        onScrollToTools={scrollToTools}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <HeroSection
          onScrollToGenerator={scrollToGenerator}
          onScrollToTools={scrollToTools}
        />

        <LiveActivityTicker />

        <FollowerGenerator onStartVerification={handleStartVerification} />

        <GrowthToolsSuite onTriggerGenerator={scrollToGenerator} />

        <ReviewsSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSettings={() => setIsSettingsOpen(true)}
        onScrollToGenerator={scrollToGenerator}
        onScrollToTools={scrollToTools}
      />

      {/* CPA Locker Modal (Target Smartlink verification) */}
      <CpaLockerModal
        isOpen={isLockerOpen}
        onClose={() => setIsLockerOpen(false)}
        username={activeSession.username}
        followerCount={activeSession.followers}
        includeViews={activeSession.includeViews}
        cpaConfig={cpaConfig}
        onSuccessClaim={handleClaimSuccess}
      />

      {/* CPA Webmaster Configuration Modal */}
      <CpaSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={cpaConfig}
        onSave={handleSaveConfig}
      />

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-950 border border-emerald-500/80 rounded-2xl shadow-2xl text-white max-w-sm flex items-start gap-3 animate-fadeIn">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="font-bold text-sm text-emerald-200">Delivery Initiated!</p>
            <p className="text-xs text-slate-300">
              +{activeSession.followers.toLocaleString()} followers for <strong className="text-white">{activeSession.username}</strong> are now entering the gradual delivery pipeline.
            </p>
          </div>
          <button
            onClick={() => setShowSuccessToast(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
export default App;
