import {
  getAnalyticsData,
  getDailyAnalyticsData,
  getMambershipAnalyticsData,
  getMonthlyAnalyticsData,
  getPostAnalyticsData,
  getWeeklyAnalyticsData,
} from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";

export const useGetAnalyticsData = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["USER_PROFILE_INFO"],
    queryFn: async () => await await getAnalyticsData(),
  });
};
export const useGetMambershipAnalyticsData = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["MAMBERSHIP_ANALYTICS"],
    queryFn: async () => await await getMambershipAnalyticsData(),
  });
};
export const useGetPostAnalyticsData = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["POST_ANALYTICS"],
    queryFn: async () => await await getPostAnalyticsData(),
  });
};

export const useGetWeeklyAnalyticsData = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["WEEKLY_ANALYTICS"],
    queryFn: async () => await await getWeeklyAnalyticsData(),
  });
};
export const useGetMonthlyAnalyticsData = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["MONTHLY_ANALYTICS"],
    queryFn: async () => await await getMonthlyAnalyticsData(),
  });
};
export const useGetDailyAnalyticsData = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["DAILY_ANALYTICS"],
    queryFn: async () => await await getDailyAnalyticsData(),
  });
};
