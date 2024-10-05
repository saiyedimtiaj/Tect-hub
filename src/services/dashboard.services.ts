"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getAnalyticsData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/analytics`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getMambershipAnalyticsData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/order-analytics`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getPostAnalyticsData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/post-analytics`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getWeeklyAnalyticsData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/user/weekly`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getMonthlyAnalyticsData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/user/monthly`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getDailyAnalyticsData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/user/daily`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
