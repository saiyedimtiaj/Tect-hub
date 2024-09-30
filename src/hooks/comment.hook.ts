import { createComment } from "@/services/comment.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateComment = (refetch: () => void) => {
  return useMutation({
    mutationKey: ["COMMENT"],
    mutationFn: async (comment: any) => await createComment(comment),
    onSuccess: (data) => {
      toast.success(data?.message);
      refetch(); // Refetch comments after successful comment creation
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
