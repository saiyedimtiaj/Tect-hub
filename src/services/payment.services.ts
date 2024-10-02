"use server";

import axiosInstance from "@/lib/axiosInstance";

export const createNewOrder = async (payload: any) => {
  try {
    const { data } = await axiosInstance.post("/payment/mambership", payload);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getAllPayment = async () => {
  try {
    const { data } = await axiosInstance.get("/payment/payment-info");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
