"use server";
import axiosInstance from "@/lib/axiosInstance";
import { IPost } from "@/types";

export const createPost = async (postData: IPost) => {
  try {
    const { data } = await axiosInstance.post("/post/create-post", postData);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getMyPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/post/my-posts");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
