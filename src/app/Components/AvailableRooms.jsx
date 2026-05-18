import Image from "next/image";
import Link from "next/link";
import { FaLayerGroup, FaUsers, FaDollarSign } from "react-icons/fa";

const getLatestRooms = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
        cache: "no-store",
    });

    return res.json();
};

const AvailableRooms = async () => {
    const rooms = await getLatestRooms();

    return (
        <section className="bg-[#F8F5EF] px-4 md:px-8 py-16">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <p className="text-[#2F855A] font-semibold mb-2">
                        Available Study Rooms
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                        Latest Rooms for Focused Study
                    </h2>

                    <p className="text-[#64748B] mt-4 max-w-2xl mx-auto">
                        Explore recently added study rooms and book the best space for your
                        reading, research, meeting, or group work.
                    </p>
                </div>

                {rooms.length === 0 ? (
                    <p className="text-center text-[#64748B]">No rooms found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map((room) => {
                            const shownAmenities = room.amenities?.slice(0, 3);
                            const extraAmenities = room.amenities?.length - 3;

                            return (
                                <div
                                    key={room._id}
                                    className="bg-white border border-[#E5E1D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col h-full"
                                >
                                    <Image
                                        src={room.image}
                                        alt={room.roomName}
                                        width={500}
                                        height={320}
                                        className="w-full h-56 object-cover"
                                    />

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-[#102A43] mb-3">
                                            {room.roomName}
                                        </h3>

                                        <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                                            {room.description.length > 100
                                                ? room.description.slice(0, 100) + "..."
                                                : room.description}
                                        </p>

                                        <div className="grid grid-cols-1 gap-2 text-sm text-[#1E293B] mb-4">
                                            <p className="flex items-center gap-2">
                                                <FaLayerGroup className="text-[#2F855A]" />
                                                {room.floor}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <FaUsers className="text-[#2F855A]" />
                                                {room.capacity} people
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <FaDollarSign className="text-[#D97706]" />
                                                ${room.hourlyRate}/hr
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {shownAmenities?.map((amenity, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full bg-[#F8F5EF] text-[#2F855A] text-xs font-medium"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}

                                            {extraAmenities > 0 && (
                                                <span className="px-3 py-1 rounded-full bg-[#102A43] text-white text-xs font-medium">
                                                    +{extraAmenities} more
                                                </span>
                                            )}
                                        </div>

                                        <Link
                                            href={`/rooms/${room._id}`}
                                            className="mt-auto w-full text-center px-5 py-3 rounded-full bg-[#2F855A] text-white font-semibold hover:bg-[#276749] transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="text-center mt-10">
                    <Link
                        href="/rooms"
                        className="inline-flex px-7 py-3 rounded-full border border-[#2F855A] text-[#2F855A] font-semibold hover:bg-[#2F855A] hover:text-white transition"
                    >
                        View All Rooms
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AvailableRooms;