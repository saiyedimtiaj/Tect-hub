import { createUser, logInUser } from "@/services/auth.services";
import { TCreateUser, TLoginUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
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
export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: TLoginUser) => await logInUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
