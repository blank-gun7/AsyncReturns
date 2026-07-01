export interface AdVariation {
  type: "terminal" | "ide" | "terminal-badge" | string;
  badgeText: string;
  copy: string;
  badgeColor: string;
  humorLevel: string;
  rationale: string;
}

export interface Impression {
  id: string;
  time: string;
  description: string;
  amount: number;
}

export interface DashboardStats {
  totalEarned: number;
  earnedToday: number;
  referralEarned: number;
  goalAmount: number;
  referralCode: string;
}

export interface CoachFormInput {
  environment: string;
  languages: string[];
  queriesPerDay: number;
  comments: string;
}
