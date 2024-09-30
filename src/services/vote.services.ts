"use server";
import axiosInstance from "@/lib/axiosInstance";

export const createOrRemoveVode = async (vote: { postId: string }) => {
  try {
    const { data } = await axiosInstance.post("/vote/vote", vote);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
