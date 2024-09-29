"use client"
import { useUser } from '@/provider/user.provider'
import React from 'react'

const page = () => {
  const { user, isLoading } = useUser();
  console.log(user, isLoading)
  return (
    <div>
      dghjdroih
    </div>
  )
}

export default page
