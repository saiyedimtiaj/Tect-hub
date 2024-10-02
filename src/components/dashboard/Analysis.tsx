"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Activity, DollarSign, Users } from 'lucide-react'
import { useGetAnalyticsData } from '@/hooks/dashboard.hook'

const Analysis = () => {
    const { data, isLoading } = useGetAnalyticsData()
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <h1 className="h-6 w-24 bg-gray-200 animate-pulse rounded"></h1>
                    ) : (
                        <h1 className="text-2xl font-bold">${data?.data?.revenue}</h1>
                    )}
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Posts</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <h1 className="h-6 w-24 bg-gray-200 animate-pulse rounded"></h1>
                    ) : (
                        <h1 className="text-2xl font-bold">+{data?.data?.post}</h1>
                    )}
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active User</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <h1 className="h-6 w-24 bg-gray-200 animate-pulse rounded"></h1>
                    ) : (
                        <h1 className="text-2xl font-bold">+{data?.data?.user}</h1>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Analysis
