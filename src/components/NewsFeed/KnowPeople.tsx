"use client"
import { Badge } from "@/components/ui/badge"
import { useCreateFollowRequest, useGetMayIKnowUser } from "@/hooks/user.hooks"
import { TUser } from "@/types"
import Image from "next/image"
import KnowPeopleSkeleton from "../Scaleton/KnowPeopleSkeleton"

const KnowPeople = () => {
    const { data, refetch, isLoading } = useGetMayIKnowUser();
    const { mutate: followRequest } = useCreateFollowRequest()
    const handleFollowRequest = (followId: string) => {
        const data = { followId }
        followRequest(data, {
            onSuccess: () => {
                refetch()
            }
        })
    }

    if (isLoading) {
        return <KnowPeopleSkeleton />
    }

    return (
        <div className="w-1/4 p-6 bg-white space-y-5 lg:block hidden">
            <h1 className="text-xl font-semibold mb-6">People may you Know</h1>
            {
                data?.data?.map((user: TUser) => <div key={user?._id} className="flex items-start gap-2">
                    <Image src={user?.profile} width={48} height={48} alt="profile" className="object-cover rounded-full" />
                    <div>
                        <h1 className="font-medium">{user?.name}</h1>
                        <Badge onClick={() => handleFollowRequest(user?._id)} className="bg-blue-600 cursor-pointer">Follow</Badge>
                    </div>
                </div>)
            }
        </div>
    )
}

export default KnowPeople
