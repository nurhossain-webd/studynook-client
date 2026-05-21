"use client";

import CancelBookingModal from "@/app/Components/CancelBookingModal";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyBookingsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        document.title = "StudyNook – My Bookings";
    }, []);

    useEffect(() => {
        const loadBookings = async () => {
            if (!user?.email) return;

            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                toast.error("Authentication token missing");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });

                const result = await res.json().catch(() => []);

                if (!res.ok) {
                    toast.error("Failed to load bookings");
                    setLoading(false);
                    return;
                }

                setBookings(result);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load bookings");
                setLoading(false);
            }
        };

        loadBookings();
    }, [user?.email]);

    const today = new Date().toISOString().split("T")[0];

    const handleCancelBooking = async () => {
        if (!selectedBooking || !user?.email) return;

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
            toast.error("Authentication token missing");
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking._id}/cancel`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );

            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(result.message || "Failed to cancel booking");
                return;
            }

            toast.success("Booking cancelled");

            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === selectedBooking._id
                        ? { ...booking, status: "cancelled" }
                        : booking
                )
            );

            setSelectedBooking(null);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    if (isPending || loading) {
        return (
            <section className="min-h-screen bg-[#F8F5EF] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto border-4 border-[#E5E1D8] border-t-[#2F855A] rounded-full animate-spin"></div>
                    <p className="mt-4 text-[#64748B] font-medium">
                        Loading your bookings...
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
                    <p className="text-[#2F855A] font-semibold mb-2">My Bookings</p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                        Manage Your Room Bookings
                    </h1>

                    <p className="text-[#64748B] mt-4">
                        View your confirmed and cancelled study room reservations.
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white border border-[#E5E1D8] rounded-3xl p-12 text-center">
                        <h2 className="text-2xl font-bold text-[#102A43]">
                            You have no bookings yet.
                        </h2>

                        <Link
                            href="/rooms"
                            className="inline-block mt-6 px-7 py-3 rounded-full bg-[#2F855A] text-white font-semibold hover:bg-[#276749] transition"
                        >
                            Browse Rooms
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => {
                            const canCancel =
                                booking.status === "confirmed" && booking.date >= today;

                            return (
                                <div
                                    key={booking._id}
                                    className="bg-white border border-[#E5E1D8] rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-12">
                                        <div className="lg:col-span-3">
                                            <Image
                                                src={booking.roomImage}
                                                alt={booking.roomName}
                                                width={500}
                                                height={320}
                                                className="w-full h-56 lg:h-full object-cover"
                                            />
                                        </div>

                                        <div className="lg:col-span-9 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                                    <h3 className="text-2xl font-bold text-[#102A43]">
                                                        {booking.roomName}
                                                    </h3>

                                                    <span
                                                        className={`w-fit px-4 py-1 rounded-full text-sm font-semibold ${
                                                            booking.status === "confirmed"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#64748B]">
                                                    <div className="bg-[#F8F5EF] rounded-2xl p-4">
                                                        <p className="text-sm">Date</p>
                                                        <h4 className="font-bold text-[#102A43]">
                                                            {booking.date}
                                                        </h4>
                                                    </div>

                                                    <div className="bg-[#F8F5EF] rounded-2xl p-4">
                                                        <p className="text-sm">Time</p>
                                                        <h4 className="font-bold text-[#102A43]">
                                                            {booking.startTime} - {booking.endTime}
                                                        </h4>
                                                    </div>

                                                    <div className="bg-[#F8F5EF] rounded-2xl p-4">
                                                        <p className="text-sm">Total Cost</p>
                                                        <h4 className="font-bold text-[#102A43]">
                                                            ${booking.totalCost}
                                                        </h4>
                                                    </div>
                                                </div>

                                                {booking.note && (
                                                    <p className="mt-4 text-[#64748B]">
                                                        <span className="font-semibold text-[#102A43]">
                                                            Note:
                                                        </span>{" "}
                                                        {booking.note}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="lg:w-44">
                                                {canCancel ? (
                                                    <button
                                                        onClick={() => setSelectedBooking(booking)}
                                                        className="w-full px-5 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="w-full px-5 py-3 rounded-full bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
                                                    >
                                                        Not Cancellable
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {selectedBooking && (
                <CancelBookingModal
                    onClose={() => setSelectedBooking(null)}
                    onConfirm={handleCancelBooking}
                />
            )}
        </section>
    );
};

export default MyBookingsPage;