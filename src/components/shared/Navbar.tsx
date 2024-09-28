import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function Navbar() {
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
                <Link href="/signin">
                    <Button>Sign In</Button>
                </Link>
            </div>

            {/* Mobile Navigation - Sheet */}
            <div>
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
                            {/* Sign In button - Mobile */}
                            <Link href="/signin" className="mt-4">
                                <Button className="w-full">Sign In</Button>
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
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

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}
