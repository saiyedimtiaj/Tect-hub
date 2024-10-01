"use client"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/Icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SyntheticEvent } from "react"
import { useUserRegistation } from "@/hooks/auth.hook"
import cover from "../../../public/assets/Chemistry Infographic5-01.jpg"

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
        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* Left section with Image */}
            <div className="relative hidden min-h-screen lg:block lg:w-1/2">
                <Image
                    src={cover}
                    alt="banner"
                    fill
                    className="object-cover min-h-screen"
                    priority
                />
            </div>

            {/* Right section with form */}
            <div className="flex w-full items-center justify-center p-6 sm:p-8 lg:w-1/2">
                <div className="mx-auto w-full max-w-md space-y-6">
                    {/* Header */}
                    <div className="flex flex-col space-y-2 text-center">
                        <Icons.logo className="mx-auto h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>

                    {/* Form */}
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

                    {/* Terms and conditions */}
                    <p className="text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link href="/terms" className="hover:text-brand underline underline-offset-4">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="hover:text-brand underline underline-offset-4">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>

            {/* Floating Login button */}
            <Link
                href="/signin"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute top-4 right-4 md:top-8 md:right-8"
                )}
            >
                Login
            </Link>
        </div>
    )
}
