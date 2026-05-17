import Link from "next/link";
import { FaBookOpen, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#102A43] text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#2F855A] flex items-center justify-center">
                            <FaBookOpen />
                        </div>
                        <h2 className="text-2xl font-bold">
                            Study<span className="text-[#D97706]">Nook</span>
                        </h2>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                        Find and book quiet library study rooms for focused learning,
                        group work, and private study sessions.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-[#D97706]">
                        Useful Links
                    </h3>

                    <div className="space-y-2 text-gray-300">
                        <Link href="/" className="block hover:text-white">
                            Home
                        </Link>
                        <Link href="/rooms" className="block hover:text-white">
                            Rooms
                        </Link>
                        <Link href="/about" className="block hover:text-white">
                            About
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-[#D97706]">
                        Contact
                    </h3>

                    <p className="text-gray-300">Email: support@studynook.com</p>
                    <p className="text-gray-300 mt-2">Phone: +49 123 456 789</p>

                    <div className="flex gap-4 mt-5">
                        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2F855A] transition">
                            <FaFacebookF />
                        </span>
                        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2F855A] transition">
                            <FaXTwitter />
                        </span>
                        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2F855A] transition">
                            <FaLinkedinIn />
                        </span>
                        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2F855A] transition">
                            <FaInstagram />
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 text-center py-5 text-gray-400 text-sm">
                © {new Date().getFullYear()} StudyNook. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;