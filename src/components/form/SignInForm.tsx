"use client"

import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/provider/user.provider";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Link from "next/link";
import { Input } from "../ui/input";

const SignInForm = () => {
    const { mutate: loginUser } = useUserLogin();
    const router = useRouter();
    const { setIsLoading } = useUser()

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const email = (form.elements.namedItem('email') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value

        loginUser({ email, password }, {
            onSuccess: () => {
                router.push('/')
                setIsLoading(true)
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
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/change-password" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                    </Link>
                </div>
                <Input id="password" type="password" required placeholder="******" />
            </div>
            <Button type="submit" className="w-full">
                Login
            </Button>
            <Button variant="outline" className="w-full">
                Login with Google
            </Button>
        </form>
    )
}

export default SignInForm
