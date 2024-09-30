"use client"
import React, { ReactNode } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation" // Import usePathname from Next.js
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Create an array of navigation links
const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart, badge: 6 },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
    { label: "Analytics", href: "/dashboard/analytics", icon: LineChart },
]

const Layout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname() // Get current path

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground">
            <div className="hidden md:block w-[220px] lg:w-[280px] border-r bg-muted/40">
                <div className="sticky top-0 left-0 min-h-screen flex flex-col justify-between">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span>Acme Inc</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-2">
                            {navLinks.map((link) => {
                                const Icon = link.icon
                                const isActive = pathname === link.href

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive
                                            ? "bg-gray-200 text-primary"
                                            : "text-muted-foreground hover:text-primary"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {link.label}
                                        {link.badge && (
                                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                                {link.badge}
                                            </Badge>
                                        )}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium mt-2">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                {navLinks.map((link) => {
                                    const Icon = link.icon
                                    const isActive = pathname === link.href

                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${isActive
                                                ? "bg-muted text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            {link.label}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1"></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
