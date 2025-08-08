import { axiosClient } from "@shared/lib/axiosClient";
import { ApiResponse } from "../../../../shared/types/type";
import type {
  ApplicationMonthlyGoal,
  ApplicationTrends,
  MonthlyApplicationRate,
  StatusDistribution,
  PortalPerformance,
} from "../types/analytic.type";

export class AnalyticApi {
  private readonly resource = "/analytics";

  async applicationTrends(userId: number, days: number = 30) {
    const response = await axiosClient.get<ApiResponse<ApplicationTrends[]>>(
      `${this.resource}/trends`,
      {
        params: { userId, days },
      },
    );
    return response.data;
  }

  async applicationStatusDistribution(userId: number) {
    const response = await axiosClient.get<ApiResponse<StatusDistribution[]>>(
      `${this.resource}/status-distribution`,
      {
        params: { userId },
      },
    );
    return response.data;
  }
  async applicationMonthlyRate(userId: number) {
    const response = await axiosClient.get<ApiResponse<MonthlyApplicationRate>>(
      `${this.resource}/monthly-application-metrics`,
      {
        params: { userId },
      },
    );
    return response.data;
  }

  async applicationMonthlyGoal(userId: number) {
    const response = await axiosClient.get<ApiResponse<ApplicationMonthlyGoal>>(
      `${this.resource}/monthly-application-progress`,
      {
        params: { userId },
      },
    );
    return response.data;
  }
  async applicationsMonthlyInterview(userId: number) {
    const response = await axiosClient.get<ApiResponse<MonthlyApplicationRate>>(
      `${this.resource}/monthly-interview-metrics`,
      {
        params: { userId },
      },
    );
    return response.data;
  }

  async portalPerformance(userId: number) {
    const response = await axiosClient.get<ApiResponse<PortalPerformance[]>>(
      `${this.resource}/portal-performance`,
      {
        params: { userId },
      },
    );
    return response.data;
  }
}
