import { createNewOrder, getAllPayment } from "@/services/payment.services";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useGetAllPayment = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["ALL_PAYMENT"],
    queryFn: async () => await getAllPayment(),
  });
};
