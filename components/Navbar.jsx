"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, Home, Calendar } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const navItems = [
        { name: "Home",   path: "/",       icon: Home },
        { name: "About",  path: "/about",  icon: BookOpen },
        { name: "Team",   path: "/team",   icon: Users },
        { name: "Events", path: "/events", icon: Calendar },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-orange-50 border-b border-orange-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    <Link href="/" className="flex items-center gap-3 group">
                        <img src="/logos/APSA_logo.png" alt="APSA Logo" className="w-12 h-12 object-contain" />
                        <img src="/logos/VAYU_logo.png" alt="VAYU Logo" className="w-12 h-12 object-contain rounded-full" />
                        <span className="inline-block text-2xl font-bold text-[#C42727] drop-shadow-sm font-['Playfair_Display'] tracking-widest">
              VAYU
            </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                    pathname === item.path
                                        ? "bg-orange-100 text-[#D7572A] shadow-sm"
                                        : "text-[#C42727] hover:text-[#790016] hover:bg-orange-50"
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="font-semibold font-['Playfair_Display']">{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-orange-600 p-2"
                    >
                        <div className="space-y-1.5">
                            <span className="block w-6 h-0.5 bg-orange-600"></span>
                            <span className="block w-6 h-0.5 bg-orange-600"></span>
                            <span className="block w-6 h-0.5 bg-orange-600"></span>
                        </div>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                                    pathname === item.path
                                        ? "bg-orange-100 text-[#D7572A]"
                                        : "text-[#C42727] hover:text-[#790016] hover:bg-orange-50"
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="font-semibold font-['Playfair_Display']">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}