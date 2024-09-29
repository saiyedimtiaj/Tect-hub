"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import { useUser } from "@/provider/user.provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { logoutUser } from "@/services/auth.services";

export default function Navbar() {
    const { user, setIsLoading } = useUser();

    const handleLogout = async () => {
        await logoutUser()
        setIsLoading(true)
    }

    return (
        <header className="flex justify-between container mx-auto h-20 w-full items-center px-4">
            {/* Logo / Brand */}
            <Link
                href="/"
                className="mr-6 font-semibold text-xl md:text-2xl flex"
                prefetch={false}
            >
                Tech Hub
            </Link>

            {/* Desktop Navigation */}
            <nav className="ml-auto hidden lg:flex gap-4">
                {["Home", "About", "Services", "Contact"].map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="group inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        prefetch={false}
                    >
                        {item}
                    </Link>
                ))}
            </nav>

            {/* Sign In button - Desktop */}
            <div className="hidden lg:block">
                {
                    user ? <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Image
                                    src={user?.profile}
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <div className="px-2 py-1">
                                <h1 className="font-semibold">{user?.name}</h1>
                                <p className="text-xs">{user?.email}</p>
                            </div>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href='/profile'>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> : <Link href="/signin">
                        <Button>Sign In</Button>
                    </Link>
                }
            </div>

            {/* Mobile Navigation - Sheet */}
            <div className="flex items-center gap-3">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6" aria-label="Open Menu" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="grid gap-4 py-6">
                            {["Home", "About", "Services", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="flex w-full items-center py-2 text-lg font-semibold"
                                    prefetch={false}
                                >
                                    {item}
                                </Link>
                            ))}

                        </div>
                    </SheetContent>
                </Sheet>
                <div className="block lg:hidden">
                    {
                        user ? <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    <Image
                                        src={user?.profile}
                                        width={36}
                                        height={36}
                                        alt="Avatar"
                                        className="overflow-hidden rounded-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <div className="px-2 py-1">
                                    <h1 className="font-semibold">{user?.name}</h1>
                                    <p className="text-xs">{user?.email}</p>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href='/profile'>Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> : <Link href="/signin">
                            <Button>Sign In</Button>
                        </Link>
                    }
                </div>
            </div>
        </header>
    );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

