import React, { useState } from 'react';
import { SlidersHorizontal, Check, ExternalLink, RefreshCw, X, Link, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CpaConfig } from '../types';
import { USER_TARGET_CPA_URL } from '../data/mockData';

interface CpaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CpaConfig;
  onSave: (newConfig: CpaConfig) => void;
}

export const CpaSettingsModal: React.FC<CpaSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<CpaConfig>(config);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleResetToUserLink = () => {
    setFormData((prev) => ({
      ...prev,
      cpaUrl: USER_TARGET_CPA_URL,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#25f4ee]" />
            <h3 className="font-bold text-base text-white">CPA Smartlink & Webmaster Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Active CPA Smartlink Configured
            </span>
            <p className="text-slate-400">
              When users click <strong className="text-slate-200">"Generate Followers"</strong> and proceed to the verification locker, all conversion offers and direct buttons route to this destination URL.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Primary CPA Smartlink / Content Locker URL:</span>
              <button
                type="button"
                onClick={handleResetToUserLink}
                className="text-[11px] text-[#25f4ee] hover:underline"
              >
                Reset to Default Smartlink
              </button>
            </label>
            <input
              type="url"
              value={formData.cpaUrl}
              onChange={(e) => setFormData({ ...formData, cpaUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#fe2c55]"
              placeholder="https://app.trcefy.com/sl?id=..."
              required
            />
          </div>

          {/* Test Link Button */}
          <div className="pt-1">
            <a
              href={formData.cpaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#fe2c55]" />
              <span>Test Current CPA Link in New Tab</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">CPA Network Identifier:</label>
              <input
                type="text"
                value={formData.networkName}
                onChange={(e) => setFormData({ ...formData, networkName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                placeholder="Trcefy / OGAds / CPABuild"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Auto-Pass SubID Parameter:</label>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-400 font-mono">
                sub5=username
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#fe2c55] to-pink-600 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Settings Saved Successfully!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
