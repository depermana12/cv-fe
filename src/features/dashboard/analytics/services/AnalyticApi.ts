import { axiosClient } from "@shared/lib/axiosClient";
import { ApiResponse } from "../../../../shared/types/type";
import type {
  ApplicationTrends,
  MonthlyApplicationRate,
  StatusDistribution,
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
      `${this.resource}/monthly-metrics`,
      {
        params: { userId },
      },
    );
    return response.data;
  }
}
