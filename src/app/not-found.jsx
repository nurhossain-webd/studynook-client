import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

const NotFound = () => {
    return (
        <section className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white border border-[#E5E1D8] rounded-3xl p-10 text-center shadow-sm">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#102A43] text-white flex items-center justify-center text-2xl mb-6">
                    <FaBookOpen />
                </div>

                <h1 className="text-6xl font-bold text-[#102A43]">
                    404
                </h1>

                <h2 className="text-2xl font-bold text-[#102A43] mt-4">
                    Page not found
                </h2>

                <p className="text-[#64748B] mt-3 leading-relaxed">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-7 px-7 py-3 rounded-full bg-[#2F855A] text-white font-semibold hover:bg-[#276749] transition"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    );
};

export default NotFound;