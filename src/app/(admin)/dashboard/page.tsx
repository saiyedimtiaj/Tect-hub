import Analysis from '@/components/dashboard/Analysis'
import MembershipChart from '@/components/dashboard/MambershipChart'
import PostAnalysis from '@/components/dashboard/PostAnalysis'
import React from 'react'

const page = () => {
    return (
        <div>
            <Analysis />
            <div className='flex items-center mt-10 gap-5 flex-col lg:flex-row'>
                <div className='w-full'>
                    <PostAnalysis />
                </div>
                <div className='w-full'>
                    <MembershipChart />
                </div>
            </div>
        </div>
    )
}

export default page
