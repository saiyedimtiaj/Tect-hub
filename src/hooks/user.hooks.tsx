import { followRequest, getAllUser, getAllUserMyIKnow, upadateUserStatus } from "@/services/user.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMayIKnowUser = () => {
    return useQuery<any, Error, any, string[]>({
        queryKey: ["FOLLOW_USER"],
        queryFn: async () => await getAllUserMyIKnow(),
    });
};
export const useGetAllUser = () => {
    return useQuery<any, Error, any, string[]>({
        queryKey: ["GET_ALL_USER"],
        queryFn: async () => await getAllUser(),
    });
};

export const useCreateFollowRequest = () => {
    return useMutation({
        mutationKey: ["POST"],
        mutationFn: async (payload: { followId: string }) => await followRequest(payload),
        onSuccess: (data) => {
            console.log(data?.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
export const useUpdateUserRole = () => {
    return useMutation({
        mutationKey: ["POST"],
        mutationFn: async (payload: { id: string, status: string }) => await upadateUserStatus(payload),
        onSuccess: (data) => {
            console.log(data?.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};