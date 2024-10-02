"use server";
import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const createOrRemoveVode = async (vote: { postId: string }) => {
  try {
    const { data } = await axiosInstance.post("/vote/vote", vote);
    revalidateTag("posts_data");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
