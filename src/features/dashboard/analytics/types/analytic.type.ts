export type ApplicationTrends = {
  date: string;
  count: number;
};

export type StatusDistribution = {
  status: string;
  count: number;
};

export type MonthlyApplicationRate = {
  thisMonth: number;
  lastMonth: number;
  growthRate: number;
};

export type ApplicationMonthlyGoal = {
  goal: number;
  current: number;
  percentage: number;
  remainingItem: number;
  remainingDays: number;
};

export type PortalPerformance = {
  portal: string;
  totalApplications: number;
  interviews: number;
  offers: number;
  interviewRate: number; // percentage 0-100
  offerRate: number; // percentage 0-100
};
