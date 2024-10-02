import { createNewOrder } from "@/services/payment.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateNewOrder = () => {
  return useMutation({
    mutationKey: ["ORDER"],
    mutationFn: async (userData: any) => await createNewOrder(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
