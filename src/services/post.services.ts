"use server";
import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const createPost = async (postData: any) => {
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
export const getUserPosts = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/post/user-posts/${id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getAllPosts = async (limit?: number, sort?: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/post/all-posts?limit=${limit}&sort=${sort}`
    );
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getSinglePosts = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/post/get-post/${id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deletePost = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/post/delete/${id}`);
    revalidateTag("posts_data");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const searchPost = async (searchTerm: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/post/search?searchTrams=${searchTerm}`
    );
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getAdminAllPost = async () => {
  try {
    const { data } = await axiosInstance.get(`/post/admin/all-posts`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
