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
