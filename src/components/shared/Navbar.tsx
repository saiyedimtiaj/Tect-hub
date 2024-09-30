"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import { useUser } from "@/provider/user.provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { logoutUser } from "@/services/auth.services";
import logo from "../../../public/assets/download.svg";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { ImSwitch } from "react-icons/im";

export default function Navbar() {
    const { user, setIsLoading } = useUser();

    const handleLogout = async () => {
        await logoutUser();
        setIsLoading(true);
    };

    // Corrected navItems array with 'name' and 'href'
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
                    <Image src={user?.profile!} width={36} height={36} alt="Avatar" className="overflow-hidden rounded-full" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex gap-2">
                    <Image src={user?.profile!} width={40} height={40} alt="Avatar" className="overflow-hidden rounded-md object-cover" />
                    <div className="px-2 py-1">
                        <h1 className="font-semibold">{user?.name}</h1>
                        <p className="text-xs">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <button className="bg-[#0F6FEC] text-white font-medium w-[200px] text-sm py-2">
                    <Link href="/profile">Profile</Link>
                </button>
                <DropdownMenuSeparator />
                <button className="flex items-center justify-center gap-2 py-2 text-sm mt-2 mb-2 w-full border border-l-0 border-r-0" onClick={handleLogout}>
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
                <form className="relative">
                    <Input className="pl-8 pr-2 py-3 bg-[#ffffff]" placeholder="Search here.." />
                    <button type="submit" className="absolute left-2.5 top-2 text-gray-600">
                        <IoSearch size={20} />
                    </button>
                </form>
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
