"use server";
import axiosInstance from "@/lib/axiosInstance";
import { TCreateUser, TLoginUser } from "@/types";
import { cookies } from "next/headers";

export const createUser = async (userData: TCreateUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/create-user", userData);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const logInUser = async (userData: TLoginUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const { data } = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
