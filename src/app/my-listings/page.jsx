"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDollarSign, FaLayerGroup, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";

const MyListingsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "StudyNook – My Listings";
    }, []);

    useEffect(() => {
        const loadMyListings = async () => {
            if (!user?.email) return;

            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                toast.error("Authentication token missing");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });

                const result = await res.json().catch(() => []);

                if (!res.ok) {
                    toast.error("Failed to load your listings");
                    setLoading(false);
                    return;
                }

                setRooms(result);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load your listings");
                setLoading(false);
            }
        };

        loadMyListings();
    }, [user?.email]);

    if (isPending || loading) {
        return (
            <section className="min-h-screen bg-[#F8F5EF] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto border-4 border-[#E5E1D8] border-t-[#2F855A] rounded-full animate-spin"></div>
                    <p className="mt-4 text-[#64748B] font-medium">
                        Loading your listings...
                    </p>
                </div>
            </section>
        );
    }

    if (!user) {
        return (
            <section className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4">
                <div className="bg-white p-10 rounded-3xl border border-[#E5E1D8] text-center">
                    <h1 className="text-2xl font-bold text-[#102A43]">
                        Please login first
                    </h1>

                    <Link
                        href="/login"
                        className="inline-block mt-5 px-6 py-3 rounded-full bg-[#2F855A] text-white font-semibold"
                    >
                        Login
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#F8F5EF] px-4 md:px-8 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-[#2F855A] font-semibold mb-2">
                        My Listings
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                        Rooms Hosted by You
                    </h1>

                    <p className="text-[#64748B] mt-4 max-w-2xl mx-auto">
                        View and manage all study rooms you have listed on StudyNook.
                    </p>
                </div>

                {rooms.length === 0 ? (
                    <div className="text-center bg-white border border-[#E5E1D8] rounded-3xl p-12">
                        <h2 className="text-2xl font-bold text-[#102A43]">
                            You have not added any rooms yet.
                        </h2>

                        <p className="text-[#64748B] mt-3">
                            Start by listing your first study room.
                        </p>

                        <Link
                            href="/add-room"
                            className="inline-block mt-6 px-7 py-3 rounded-full bg-[#2F855A] text-white font-semibold hover:bg-[#276749] transition"
                        >
                            Add Room
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <h3 className="text-xl font-bold text-[#102A43]">
                                                {room.roomName}
                                            </h3>

                                            <span className="px-3 py-1 rounded-full bg-[#F8F5EF] text-[#D97706] text-xs font-semibold whitespace-nowrap">
                                                {room.bookingCount || 0} booked
                                            </span>
                                        </div>

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
                                            Manage Details
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyListingsPage;