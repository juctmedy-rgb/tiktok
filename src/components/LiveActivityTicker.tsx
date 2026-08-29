import React, { useState, useEffect } from 'react';
import { ActivityItem } from '../types';
import { INITIAL_ACTIVITIES } from '../data/mockData';
import { Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

export const LiveActivityTicker: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  // Dynamic live event injector every 6-9 seconds
  useEffect(() => {
    const names = [
      'noah_edits', 'mia_soundtracks', 'ethan_clips', 'isabella_dance',
      'oliver_tech', 'ava_asmr', 'liam_fitness', 'charlotte_cooking',
      'lucas_motivate', 'emily_trends', 'james_travels', 'hannah_art'
    ];
    const countries = [
      { name: 'United States', flag: '🇺🇸' },
      { name: 'United Kingdom', flag: '🇬🇧' },
      { name: 'Canada', flag: '🇨🇦' },
      { name: 'Germany', flag: '🇩🇪' },
      { name: 'Australia', flag: '🇦🇺' },
      { name: 'France', flag: '🇫🇷' },
      { name: 'Brazil', flag: '🇧🇷' },
      { name: 'Saudi Arabia', flag: '🇸🇦' },
      { name: 'United Arab Emirates', flag: '🇦🇪' },
    ];
    const followerCounts = [2500, 5000, 10000];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      const randomFollowers = followerCounts[Math.floor(Math.random() * followerCounts.length)];
      
      const newActivity: ActivityItem = {
        id: `act-live-${Date.now()}`,
        username: `@${randomName}`,
        avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 90000000)}?w=100&auto=format&fit=crop&q=80`,
        country: randomCountry.name,
        countryFlag: randomCountry.flag,
        followersAdded: randomFollowers,
        timeAgo: 'Just now',
        status: 'completed',
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 7)]);
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950/70 border-y border-slate-800/80 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {/* Live Badge */}
        <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-slate-800">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-slate-200 hidden sm:inline">
            Live Deliveries
          </span>
        </div>

        {/* Scrolling or Static List */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5 text-xs text-slate-300">
          {activities.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shrink-0 shadow-sm"
            >
              <span>{item.countryFlag}</span>
              <span className="font-bold text-white">{item.username}</span>
              <span className="text-slate-500">•</span>
              <span className="font-bold text-emerald-400">
                +{item.followersAdded.toLocaleString()} followers
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                ({item.timeAgo})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
