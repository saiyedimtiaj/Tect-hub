import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getSinglePosts,
  getUserPosts,
  searchPost,
} from "@/services/post.services";
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
export const useGetUserAllPosts = (id: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["USER_POST"],
    queryFn: async () => await getUserPosts(id),
  });
};
export const useAllPosts = (limit?: number, sort?: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["All_POST"],
    queryFn: async () => await getAllPosts(limit, sort),
  });
};
export const useGetSinglePosts = (id: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["SINGLE_POSTYYY"],
    queryFn: async () => await getSinglePosts(id),
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationKey: ["POST_DEL"],
    mutationFn: async (id: string) => await deletePost(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useGetSearchItem = () => {
  return useMutation({
    mutationKey: ["POST_SEARCH"],
    mutationFn: async (searchTerm: string) => await searchPost(searchTerm),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
