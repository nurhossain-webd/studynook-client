"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBookOpen, FaUserCircle } from "react-icons/fa";

const Navbar = ({ user, handleLogout }) => {
    const pathname = usePathname();

    const navLinks = (
        <>
            <Link href="/" className="hover:text-[#2F855A]">
                Home
            </Link>

            <Link href="/rooms" className="hover:text-[#2F855A]">
                Rooms
            </Link>

            {user && (
                <>
                    <Link href="/add-room" className="hover:text-[#2F855A]">
                        Add Room
                    </Link>

                    <Link href="/my-listings" className="hover:text-[#2F855A]">
                        My Listings
                    </Link>

                    <Link href="/my-bookings" className="hover:text-[#2F855A]">
                        My Bookings
                    </Link>
                </>
            )}
        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#E5E1D8]">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#102A43] text-white flex items-center justify-center">
                        <FaBookOpen />
                    </div>

                    <h1 className="text-2xl font-bold text-[#102A43]">
                        Study<span className="text-[#2F855A]">Nook</span>
                    </h1>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-7 font-medium text-[#1E293B]">
                    {navLinks}
                </div>

                {/* Desktop Auth */}
                <div className="hidden lg:flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className={`px-5 py-2 rounded-full border border-[#2F855A] transition ${pathname === "/login"
                                        ? "bg-[#2F855A] text-white"
                                        : "text-[#2F855A] hover:bg-[#2F855A] hover:text-white"
                                    }`}
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className={`px-5 py-2 rounded-full border border-[#2F855A] transition ${pathname === "/register"
                                        ? "bg-[#2F855A] text-white"
                                        : "text-[#2F855A] hover:bg-[#2F855A] hover:text-white"
                                    }`}
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="relative group">
                            <button className="flex items-center gap-2">
                                {user?.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName || "User"}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-[#2F855A]"
                                    />
                                ) : (
                                    <FaUserCircle className="text-3xl text-[#102A43]" />
                                )}

                                <span className="font-medium text-[#102A43]">
                                    {user?.displayName || "User"}
                                </span>
                            </button>

                            <div className="absolute right-0 hidden group-hover:block pt-3">
                                <div className="w-48 p-3 shadow bg-white rounded-2xl border border-[#E5E1D8]">
                                    <Link
                                        href="/my-listings"
                                        className="block px-3 py-2 hover:bg-[#F8F5EF] rounded-lg"
                                    >
                                        My Listings
                                    </Link>

                                    <Link
                                        href="/my-bookings"
                                        className="block px-3 py-2 hover:bg-[#F8F5EF] rounded-lg"
                                    >
                                        My Bookings
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <details className="relative">
                        <summary className="list-none cursor-pointer text-2xl text-[#102A43]">
                            ☰
                        </summary>

                        <div className="absolute right-0 mt-4 w-56 p-4 shadow bg-white rounded-2xl space-y-3 border border-[#E5E1D8] text-[#1E293B]">
                            {navLinks}

                            {!user ? (
                                <>
                                    <Link
                                        href="/login"
                                        className={`block px-4 py-2 rounded-full border border-[#2F855A] text-center ${pathname === "/login"
                                                ? "bg-[#2F855A] text-white"
                                                : "text-[#2F855A]"
                                            }`}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        className={`block px-4 py-2 rounded-full border border-[#2F855A] text-center ${pathname === "/register"
                                                ? "bg-[#2F855A] text-white"
                                                : "text-[#2F855A]"
                                            }`}
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 rounded-full bg-red-500 text-white"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </details>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;