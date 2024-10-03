"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import { useUser } from "@/provider/user.provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { logoutUser } from "@/services/auth.services";
import logo from "../../../public/assets/download.svg";
import { ImSwitch } from "react-icons/im";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
    const { user, setIsLoading } = useUser();
    const pathname = usePathname();

    const commonRoute = ["/about", "/contact"];
    const router = useRouter();

    const handleLogout = async () => {
        if (commonRoute.includes(pathname)) {
            await logoutUser();
            setIsLoading(true);
            return;
        } else {
            await logoutUser();
            router.push("/");
            setIsLoading(true);
        }
    };

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "News Feed", href: "/news-feed" },
        { name: "Contact", href: "/contact" },
    ];

    const UserDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <Image src={user?.profile || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} width={36} height={36} alt="Avatar" className="overflow-hidden rounded-full" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                <div className="flex items-center gap-2 p-2">
                    <Image src={user?.profile || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} width={40} height={40} alt="Avatar" className="rounded-md object-cover" />
                    <div>
                        <h1 className="font-semibold">{user?.name}</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <button className="bg-[#0F6FEC] text-white font-medium w-full text-sm py-2 rounded-md">
                    <Link href="/profile" className="block w-full text-center">Profile</Link>
                </button>
                {user?.role === "admin" && (
                    <>
                        <DropdownMenuSeparator />
                        <button className="bg-gray-100 dark:bg-gray-700 font-medium w-full text-sm py-2 rounded-md">
                            <Link href="/dashboard" className="block w-full text-center">Admin Dashboard</Link>
                        </button>
                    </>
                )}
                <DropdownMenuSeparator />
                <button className="flex items-center justify-center gap-2 py-2 text-sm w-full border-t" onClick={handleLogout}>
                    <ImSwitch />
                    Logout
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <header className="flex justify-between container mx-auto h-20 w-full items-center px-4">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
                <Link href="/" className="font-semibold text-xl md:text-2xl flex" prefetch={false}>
                    <Image width={40} height={40} src={logo} alt="logo" />
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="ml-auto hidden lg:flex gap-4 mr-5">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 font-medium text-lg" prefetch={false}>
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Sign In button - Desktop */}
            <div className="hidden lg:block">
                {user ? <UserDropdown /> : (
                    <Link href="/signin">
                        <Button>Sign In</Button>
                    </Link>
                )}
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
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="block lg:hidden">
                    {user ? <UserDropdown /> : (
                        <Link href="/signin">
                            <Button>Sign In</Button>
                        </Link>
                    )}
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
