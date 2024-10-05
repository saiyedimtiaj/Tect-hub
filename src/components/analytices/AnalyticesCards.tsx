import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { Vote } from 'lucide-react'
import { BiCommentDots } from 'react-icons/bi'

type Props = {
    post: number;
    comment: number
}

const AnalyticesCards = ({ post, comment }: Props) => {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Post
                    </CardTitle>
                    <HiOutlineDocumentText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{post}</div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Vote
                    </CardTitle>
                    <Vote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Comment</CardTitle>
                    <BiCommentDots className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{comment}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AnalyticesCards
