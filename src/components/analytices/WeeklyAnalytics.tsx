import React from 'react'
import AnalyticesCards from './AnalyticesCards'
import AnalyticesLineChart from './AnalyticesLineChart'
import { useGetWeeklyAnalyticsData } from '@/hooks/dashboard.hook'
import AnalyticesBarChart from './AnalyticesBarChart'
import Loading from '../shared/Loading'

const WeeklyAnalytics = () => {
    const { data, isLoading } = useGetWeeklyAnalyticsData()

    const postData = data?.data?.postData?.map((item: { week: string, count: number }) => ({
        month: item.week,
        desktop: item.count,
    })) || [];
    const commentData = data?.data?.comment?.map((item: { week: string, count: number }) => ({
        month: item.week,
        desktop: item.count,
    })) || [];
    const voatData = data?.data?.voat?.map((item: { week: string, count: number }) => ({
        month: item.week,
        desktop: item.count,
    })) || [];


    return (
        isLoading ? <Loading /> : <div className="mt-6">
            <main className="flex flex-1 flex-col gap-4 md:gap-8">
                <AnalyticesCards voat={data?.data?.voatCount} post={data?.data?.postCount} comment={data?.data?.commentCount} />

            </main>
            <div className='mt-4'>
                <AnalyticesLineChart title='Post Chart' label='post' header='Showing total Post for the last 5 week' postData={postData} />
            </div>
            <div className='mt-5 mb-8 flex items-center flex-col lg:flex-row gap-5'>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticesBarChart title='Comment Chart' label='Comment' header='Showing total comment for the last 5 week' postData={commentData} />
                </div>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticesLineChart title='Voat Chart' label='voat' header='Showing total voat for the last 5 week' postData={voatData} />
                </div>
            </div>
        </div>
    )
}

export default WeeklyAnalytics
