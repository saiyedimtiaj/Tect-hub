import { createOrRemoveVode } from "@/services/vote.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddOrRemoveVote = (refetch: () => void) => {
  return useMutation({
    mutationKey: ["VOTE"],
    mutationFn: async (data: { postId: string }) =>
      await createOrRemoveVode(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
