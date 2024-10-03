"use client"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/Icons"
import cover from "../../../public/assets/Chemistry Infographic5-01.jpg"
import RegisterForm from "@/components/form/RegisterForm"

export default function RegisterPage() {

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
                    <RegisterForm />

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
