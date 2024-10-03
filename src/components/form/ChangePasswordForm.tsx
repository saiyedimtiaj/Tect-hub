"use client"
import React, { SyntheticEvent, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useChangePassword } from '@/hooks/auth.hook'
import { useRouter } from 'next/navigation'

const ChangePasswordForm = () => {
    const [error, setError] = useState<string | null>(null);
    const { mutate: changePassword } = useChangePassword();
    const router = useRouter()

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const email = (form.elements.namedItem('email') as HTMLInputElement).value
        const newPassword = (form.elements.namedItem('newpassword') as HTMLInputElement).value
        const confirmPassword = (form.elements.namedItem('confirmpassword') as HTMLInputElement).value

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError("New password and confirmation password do not match!")
            return
        }
        const data = {
            email,
            password: newPassword
        }
        changePassword(data, {
            onSuccess: () => {
                router.push("/signin")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="jon@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="newpassword">New Password</Label>
                <Input
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    required
                    placeholder="******"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Re-type New Password</Label>
                <Input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    required
                    placeholder="******"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
                Change Password
            </Button>
        </form>
    )
}

export default ChangePasswordForm

