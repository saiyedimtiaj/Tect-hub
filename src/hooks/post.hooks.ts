import { createPost, getAllPosts, getMyPosts } from "@/services/post.services";
import { IPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["POST"],
    mutationFn: async (userData: any) => await createPost(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyPosts = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["POST"],
    queryFn: async () => await getMyPosts(),
  });
};
export const useAllPosts = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["All_POST"],
    queryFn: async () => await getAllPosts(),
  });
};
