export interface CpaOffer {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardText: string;
  timeEstimate: string;
  conversionType: 'app_install' | 'survey' | 'phone_pin' | 'email_submit';
  isPopular?: boolean;
}

export interface ActivityItem {
  id: string;
  username: string;
  avatar: string;
  country: string;
  countryFlag: string;
  followersAdded: number;
  timeAgo: string;
  status: 'completed' | 'processing';
}

export interface UserReview {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followersGained: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  likes: number;
}

export interface HashtagSet {
  category: string;
  categoryNameEn: string;
  icon: string;
  tags: string[];
  estimatedReach: string;
  competition: 'High' | 'Medium' | 'Low (Golden Opportunity)';
}

export interface ViralHook {
  id: string;
  category: string;
  hookText: string;
  whyItWorks: string;
  targetAudience: string;
}

export interface CpaConfig {
  cpaUrl: string;
  networkName: string;
  autoRedirect: boolean;
  customOfferTitle: string;
  offer1Url: string;
  offer2Url: string;
  offer3Url: string;
}
