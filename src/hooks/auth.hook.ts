import {
  changePassword,
  createAdmin,
  createUser,
  getUserInfo,
  getUserProfile,
  logInUser,
  updateUser,
} from "@/services/auth.services";
import { TCreateUser, TLoginUser } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserRegistation = () => {
  return useMutation({
    mutationKey: ["USER_REGISTATION"],
    mutationFn: async (userData: TCreateUser) => await createUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useCreateAdmin = () => {
  return useMutation({
    mutationKey: ["USER_REGISTATION"],
    mutationFn: async (userData: TCreateUser) => await createAdmin(userData),
    onSuccess: () => {
      toast.success("create admin sucessful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["PASSWORD"],
    mutationFn: async (userData: any) => await changePassword(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: TLoginUser) => await logInUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: any) => await updateUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useGetUser = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["USER_PROFILE"],
    queryFn: async () => await getUserProfile(),
  });
};
export const useGetInfo = (id: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["USER_PROFILE_INFO"],
    queryFn: async () => await getUserInfo(id),
  });
};
