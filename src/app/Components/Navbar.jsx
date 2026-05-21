"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBookOpen, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        toast.success("Logout successful");
        router.push("/login");
        router.refresh();
    };

    const linkClass = (path) =>
        `transition hover:text-[#2F855A] ${
            pathname === path ? "text-[#2F855A] font-semibold" : "text-[#1E293B]"
        }`;

    const mobileLinkClass = (path) =>
        `block w-full px-4 py-2 rounded-xl transition ${
            pathname === path
                ? "bg-[#F8F5EF] text-[#2F855A] font-semibold"
                : "text-[#1E293B] hover:bg-[#F8F5EF] hover:text-[#2F855A]"
        }`;

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

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-7 font-medium">
                    <Link href="/" className={linkClass("/")}>
                        Home
                    </Link>

                    <Link href="/rooms" className={linkClass("/rooms")}>
                        Rooms
                    </Link>

                    {user && (
                        <>
                            <Link href="/add-room" className={linkClass("/add-room")}>
                                Add Room
                            </Link>

                            <Link href="/my-listings" className={linkClass("/my-listings")}>
                                My Listings
                            </Link>

                            <Link href="/my-bookings" className={linkClass("/my-bookings")}>
                                My Bookings
                            </Link>
                        </>
                    )}
                </div>

                {/* Desktop Auth */}
                <div className="hidden lg:flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className={`px-5 py-2 rounded-full border border-[#2F855A] transition ${
                                    pathname === "/login"
                                        ? "bg-[#2F855A] text-white"
                                        : "text-[#2F855A] hover:bg-[#2F855A] hover:text-white"
                                }`}
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className={`px-5 py-2 rounded-full border border-[#2F855A] transition ${
                                    pathname === "/register"
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
                                {user?.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "User"}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-[#2F855A]"
                                    />
                                ) : (
                                    <FaUserCircle className="text-3xl text-[#102A43]" />
                                )}

                                <span className="font-medium text-[#102A43]">
                                    {user?.name || "User"}
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

                        <div className="absolute right-0 mt-4 w-64 p-4 shadow-lg bg-white rounded-2xl border border-[#E5E1D8]">
                            <div className="flex flex-col gap-2">
                                <Link href="/" className={mobileLinkClass("/")}>
                                    Home
                                </Link>

                                <Link href="/rooms" className={mobileLinkClass("/rooms")}>
                                    Rooms
                                </Link>

                                {user && (
                                    <>
                                        <Link
                                            href="/add-room"
                                            className={mobileLinkClass("/add-room")}
                                        >
                                            Add Room
                                        </Link>

                                        <Link
                                            href="/my-listings"
                                            className={mobileLinkClass("/my-listings")}
                                        >
                                            My Listings
                                        </Link>

                                        <Link
                                            href="/my-bookings"
                                            className={mobileLinkClass("/my-bookings")}
                                        >
                                            My Bookings
                                        </Link>
                                    </>
                                )}

                                <div className="border-t border-[#E5E1D8] pt-3 mt-2">
                                    {!user ? (
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                href="/login"
                                                className={`block w-full px-4 py-2 rounded-full border border-[#2F855A] text-center ${
                                                    pathname === "/login"
                                                        ? "bg-[#2F855A] text-white"
                                                        : "text-[#2F855A]"
                                                }`}
                                            >
                                                Login
                                            </Link>

                                            <Link
                                                href="/register"
                                                className={`block w-full px-4 py-2 rounded-full border border-[#2F855A] text-center ${
                                                    pathname === "/register"
                                                        ? "bg-[#2F855A] text-white"
                                                        : "text-[#2F855A]"
                                                }`}
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 px-2">
                                                {user?.image ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name || "User"}
                                                        width={32}
                                                        height={32}
                                                        className="w-8 h-8 rounded-full object-cover border border-[#2F855A]"
                                                    />
                                                ) : (
                                                    <FaUserCircle className="text-2xl text-[#102A43]" />
                                                )}

                                                <span className="font-medium text-[#102A43]">
                                                    {user?.name || "User"}
                                                </span>
                                            </div>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;