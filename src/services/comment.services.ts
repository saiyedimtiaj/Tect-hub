"use server";
import axiosInstance from "@/lib/axiosInstance";

export const createComment = async (comment: any) => {
  try {
    const { data } = await axiosInstance.post(
      "/comment/create-comment",
      comment
    );
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
