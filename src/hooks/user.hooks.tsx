import { followRequest, getAllUserMyIKnow } from "@/services/user.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMayIKnowUser = () => {
    return useQuery<any, Error, any, string[]>({
        queryKey: ["FOLLOW_USER"],
        queryFn: async () => await getAllUserMyIKnow(),
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