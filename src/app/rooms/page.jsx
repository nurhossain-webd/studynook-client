import Image from "next/image";
import Link from "next/link";
import {
    FaDollarSign,
    FaLayerGroup,
    FaUsers,
    FaSearch,
} from "react-icons/fa";

export const metadata = {
    title: "StudyNook – Available Rooms",
};

const amenitiesList = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

const getRooms = async (searchParams) => {
    const query = new URLSearchParams();

    if (searchParams?.search) {
        query.set("search", searchParams.search);
    }

    const amenities = searchParams?.amenity;

    if (amenities) {
        if (Array.isArray(amenities)) {
            amenities.forEach((item) => query.append("amenity", item));
        } else {
            query.append("amenity", amenities);
        }
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms?${query.toString()}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};

const RoomsPage = async ({ searchParams }) => {
    const params = await searchParams;
    const rooms = await getRooms(params);

    const selectedAmenities = params?.amenity
        ? Array.isArray(params.amenity)
            ? params.amenity
            : [params.amenity]
        : [];

    return (
        <section className="min-h-screen bg-[#F8F5EF] px-4 md:px-8 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-[#2F855A] font-semibold mb-2">
                        Available Study Rooms
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                        Browse All Study Rooms
                    </h1>

                    <p className="text-[#64748B] mt-4 max-w-2xl mx-auto">
                        Search and filter quiet, comfortable, and private study rooms
                        for your next focused session.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Search and Filter Sidebar */}
                    <aside className="lg:col-span-3">
                        <form className="bg-white border border-[#E5E1D8] rounded-3xl p-6 shadow-sm lg:sticky lg:top-28">
                            <div>
                                <label className="block text-[#102A43] font-semibold mb-3">
                                    Search by name
                                </label>

                                <div className="relative">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />

                                    <input
                                        type="text"
                                        name="search"
                                        defaultValue={params?.search || ""}
                                        placeholder="e.g. Quiet Pod"
                                        className="w-full border border-[#E5E1D8] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#2F855A] text-[#102A43]"
                                    />
                                </div>
                            </div>

                            <div className="mt-7">
                                <h3 className="text-[#102A43] font-semibold mb-3">
                                    Amenities
                                </h3>

                                <div className="space-y-3">
                                    {amenitiesList.map((amenity) => (
                                        <label
                                            key={amenity}
                                            className="flex items-center gap-3 text-[#1E293B] cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                name="amenity"
                                                value={amenity}
                                                defaultChecked={selectedAmenities.includes(amenity)}
                                                className="accent-[#2F855A] w-4 h-4"
                                            />

                                            <span>{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-7 px-5 py-3 rounded-full bg-[#2F855A] text-white font-semibold hover:bg-[#276749] transition"
                            >
                                Apply Filter
                            </button>

                            <Link
                                href="/rooms"
                                className="block text-center mt-4 text-sm font-semibold text-[#D97706] hover:underline"
                            >
                                Clear filters
                            </Link>
                        </form>
                    </aside>

                    {/* Right Room Cards */}
                    <div className="lg:col-span-9">
                        {rooms.length === 0 ? (
                            <div className="text-center bg-white border border-[#E5E1D8] rounded-3xl p-12">
                                <h2 className="text-2xl font-bold text-[#102A43]">
                                    No rooms found
                                </h2>

                                <p className="text-[#64748B] mt-3">
                                    Try changing your search text or selected amenities.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {rooms.map((room) => {
                                    const shownAmenities = room.amenities?.slice(0, 3) || [];
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
                                                    {room.description?.length > 100
                                                        ? room.description.slice(0, 100) + "..."
                                                        : room.description}
                                                </p>

                                                <div className="space-y-2 text-sm text-[#1E293B] mb-4">
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
                                                    {shownAmenities.map((amenity, index) => (
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoomsPage;