"use client"
import Banner from '@/components/home/Banner';
import PricingAndPlans from '@/components/home/PricingAndPlans';
import { useUser } from '@/provider/user.provider'
import React from 'react'

const page = () => {
  const { user, isLoading } = useUser();
  console.log(user, isLoading)
  return (
    <div className='container mx-auto px-4'>
      <Banner />
      <PricingAndPlans />
    </div>
  )
}

export default page
