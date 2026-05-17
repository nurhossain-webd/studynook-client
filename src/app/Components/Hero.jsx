import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarCheck, FaUsers } from "react-icons/fa";

const Hero = () => {
    return (
        <section className="bg-[#F8F5EF] px-4 md:px-8 py-14 md:py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div>
                    <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-[#E5E1D8] text-[#2F855A] font-medium">
                        Smart Library Room Booking
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#102A43]">
                        Find Your Perfect{" "}
                        <span className="text-[#2F855A]">Study Room</span>
                    </h1>

                    <p className="mt-6 text-lg text-[#64748B] leading-relaxed max-w-xl">
                        Browse and book quiet, private study rooms in your library. List
                        your own room and help students find better spaces for focused
                        learning.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/rooms"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#2F855A] text-white font-semibold hover:bg-[#276749] transition"
                        >
                            Explore Rooms <FaArrowRight />
                        </Link>

                        <Link
                            href="/add-room"
                            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-[#2F855A] text-[#2F855A] font-semibold hover:bg-[#2F855A] hover:text-white transition"
                        >
                            List Your Room
                        </Link>
                    </div>

                    {/* Small Stats */}
                    <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
                        <div className="bg-white border border-[#E5E1D8] rounded-2xl p-4">
                            <FaCalendarCheck className="text-[#2F855A] text-2xl mb-2" />
                            <h3 className="text-xl font-bold text-[#102A43]">Easy Booking</h3>
                            <p className="text-sm text-[#64748B]">Reserve rooms by time slot</p>
                        </div>

                        <div className="bg-white border border-[#E5E1D8] rounded-2xl p-4">
                            <FaUsers className="text-[#D97706] text-2xl mb-2" />
                            <h3 className="text-xl font-bold text-[#102A43]">For Students</h3>
                            <p className="text-sm text-[#64748B]">Study alone or in groups</p>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <div className="absolute -top-5 -left-5 w-28 h-28 bg-[#D97706]/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-[#2F855A]/20 rounded-full blur-2xl"></div>

                    <Image
                        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
                        alt="Modern library study room"
                        width={800}
                        height={600}
                        priority
                        className="relative w-full h-[320px] md:h-[460px] object-cover rounded-[2rem] shadow-xl border border-[#E5E1D8]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;