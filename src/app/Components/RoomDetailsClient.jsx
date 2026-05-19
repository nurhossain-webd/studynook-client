"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaDollarSign, FaLayerGroup, FaUsers } from "react-icons/fa";
import UpdateRoomModal from "@/app/Components/UpdateRoomModal";

const RoomDetailsClient = ({ room }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    if (!room) {
        return (
            <section className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4">
                <div className="bg-white p-10 rounded-3xl text-center border border-[#E5E1D8]">
                    <h1 className="text-2xl font-bold text-[#102A43]">Room not found</h1>

                    <Link href="/rooms" className="text-[#2F855A] font-semibold mt-4 block">
                        Back to Rooms
                    </Link>
                </div>
            </section>
        );
    }

    const isOwner = user?.email === room.ownerEmail;

    return (
        <section className="min-h-screen bg-[#F8F5EF] px-4 md:px-8 py-16">
            <div className="max-w-6xl mx-auto bg-white border border-[#E5E1D8] rounded-3xl overflow-hidden shadow-sm">
                <Image
                    src={room.image}
                    alt={room.roomName}
                    width={1200}
                    height={600}
                    className="w-full h-[280px] md:h-[450px] object-cover"
                />

                <div className="p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        <div>
                            <p className="text-[#2F855A] font-semibold mb-2">
                                Study Room Details
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                                {room.roomName}
                            </h1>
                        </div>

                        <p className="px-5 py-2 rounded-full bg-[#F8F5EF] text-[#102A43] font-semibold">
                            Booked {room.bookingCount || 0} times
                        </p>
                    </div>

                    <p className="text-[#64748B] leading-relaxed mt-6">
                        {room.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                        <div className="border border-[#E5E1D8] rounded-2xl p-5">
                            <FaLayerGroup className="text-[#2F855A] text-2xl mb-3" />
                            <h3 className="font-bold text-[#102A43]">Floor</h3>
                            <p className="text-[#64748B]">{room.floor}</p>
                        </div>

                        <div className="border border-[#E5E1D8] rounded-2xl p-5">
                            <FaUsers className="text-[#2F855A] text-2xl mb-3" />
                            <h3 className="font-bold text-[#102A43]">Capacity</h3>
                            <p className="text-[#64748B]">{room.capacity} people</p>
                        </div>

                        <div className="border border-[#E5E1D8] rounded-2xl p-5">
                            <FaDollarSign className="text-[#D97706] text-2xl mb-3" />
                            <h3 className="font-bold text-[#102A43]">Hourly Rate</h3>
                            <p className="text-[#64748B]">${room.hourlyRate}/hr</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-[#102A43] mb-4">
                            Amenities
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {room.amenities?.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full bg-[#F8F5EF] text-[#2F855A] font-medium"
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        {!isOwner && (
                            <button className="px-7 py-3 rounded-full bg-[#2F855A] text-white font-semibold hover:bg-[#276749] transition">
                                Book Now
                            </button>
                        )}

                        {isOwner && (
                            <button
                                onClick={() => setShowUpdateModal(true)}
                                className="px-7 py-3 rounded-full bg-[#D97706] text-white font-semibold hover:bg-[#b45309] transition"
                            >
                                Update Room
                            </button>
                        )}

                        <Link
                            href="/rooms"
                            className="px-7 py-3 rounded-full border border-[#2F855A] text-[#2F855A] font-semibold hover:bg-[#2F855A] hover:text-white transition text-center"
                        >
                            Back to Rooms
                        </Link>
                    </div>
                </div>
            </div>

            {showUpdateModal && (
                <UpdateRoomModal
                    room={room}
                    onClose={() => setShowUpdateModal(false)}
                />
            )}
        </section>
    );
};

export default RoomDetailsClient;