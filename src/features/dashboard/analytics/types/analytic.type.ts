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
