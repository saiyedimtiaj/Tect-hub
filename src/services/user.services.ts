"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getAllUserMyIKnow = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/know-users");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const followRequest = async (payload: { followId: string }) => {
  try {
    const { data } = await axiosInstance.patch("/auth/follow", payload);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
