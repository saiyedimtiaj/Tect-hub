"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/Icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SyntheticEvent } from "react"
import { useUserRegistation } from "@/hooks/auth.hook"

export default function RegisterPage() {

    const { mutate: createUser } = useUserRegistation()

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const name = (form.elements.namedItem('name') as HTMLInputElement).value
        const email = (form.elements.namedItem('email') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value

        createUser({ name, email, password })
    }
    return (
        <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/signin"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Login
            </Link>
            <div className="hidden h-full bg-muted lg:block" />
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Icons.logo className="mx-auto h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">User Name</Label>
                            <Input
                                id="name"
                                type="name"
                                placeholder="John Doe"
                                required
                            />
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="*******" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign up with Google
                        </Button>
                    </form>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}