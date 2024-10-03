"use client"
import { useUserRegistation } from '@/hooks/auth.hook'
import React, { SyntheticEvent } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@/provider/user.provider'

const RegisterForm = () => {
  const { mutate: createUser } = useUserRegistation();
  const router = useRouter();
  const { setIsLoading } = useUser()

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    createUser({ name, email, password }, {
      onSuccess: () => {
        router.push('/')
        setIsLoading(true)
      }
    })
  }
  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">User Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Create an account
      </Button>
      <Button variant="outline" className="w-full">
        Sign up with Google
      </Button>
    </form>
  )
}

export default RegisterForm
