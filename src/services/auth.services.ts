"use server";
import axiosInstance from "@/lib/axiosInstance";
import { TCreateUser, TLoginUser } from "@/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

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
export const changePassword = async (userData: any) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      userData
    );
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

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
  return decodedToken;
};

export const logoutUser = async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const updateUser = async (userData: any) => {
  try {
    console.log(userData);
    const { data } = await axiosInstance.put(
      `/auth/update-user/${userData?._id}`,
      userData
    );
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
export const getUserProfile = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/user-profile`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getUserInfo = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/auth/user-info/${id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
