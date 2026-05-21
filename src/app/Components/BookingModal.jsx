"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
];

const BookingModal = ({ room, user, onClose }) => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const getHour = (time) => Number(time.split(":")[0]);

    const totalCost =
        startTime && endTime
            ? (getHour(endTime) - getHour(startTime)) * Number(room.hourlyRate)
            : 0;

    const endTimeOptions = startTime
        ? timeSlots.filter((time) => getHour(time) > getHour(startTime))
        : [];

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first");
            return;
        }

        const formData = new FormData(e.currentTarget);

        const bookingData = {
            roomId: room._id,
            roomName: room.roomName,
            roomImage: room.image,
            date: formData.get("date"),
            startTime,
            endTime,
            totalCost,
            note: formData.get("note"),
        };

        if (!bookingData.date || !startTime || !endTime) {
            toast.error("Please select date and time");
            return;
        }

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
            toast.error("Authentication token missing");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(bookingData),
            });

            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(result.message || "Booking failed");
                return;
            }

            toast.success("Room booked successfully!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.log("Booking error:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E5E1D8] shadow-xl p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F8F5EF] text-[#102A43] flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition"
                >
                    <FaTimes />
                </button>

                <div className="text-center mb-7">
                    <p className="text-[#2F855A] font-semibold mb-2">
                        Book Study Room
                    </p>

                    <h2 className="text-3xl font-bold text-[#102A43]">
                        {room.roomName}
                    </h2>

                    <p className="text-[#64748B] mt-2">
                        Select your date and time slot.
                    </p>
                </div>

                <form onSubmit={handleBooking} className="space-y-5">
                    <div>
                        <label className="block text-[#102A43] font-medium mb-2">
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            min={today}
                            required
                            className="w-full border border-[#E5E1D8] rounded-xl px-4 py-3 outline-none focus:border-[#2F855A]"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[#102A43] font-medium mb-2">
                                Start Time
                            </label>

                            <select
                                required
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                    setEndTime("");
                                }}
                                className="w-full border border-[#E5E1D8] rounded-xl px-4 py-3 outline-none focus:border-[#2F855A]"
                            >
                                <option value="">Select start</option>

                                {timeSlots.slice(0, -1).map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[#102A43] font-medium mb-2">
                                End Time
                            </label>

                            <select
                                required
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full border border-[#E5E1D8] rounded-xl px-4 py-3 outline-none focus:border-[#2F855A]"
                            >
                                <option value="">Select end</option>

                                {endTimeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="bg-[#F8F5EF] border border-[#E5E1D8] rounded-2xl p-4">
                        <p className="text-[#64748B]">Total Cost</p>

                        <h3 className="text-2xl font-bold text-[#102A43]">
                            ${totalCost}
                        </h3>
                    </div>

                    <div>
                        <label className="block text-[#102A43] font-medium mb-2">
                            Special Note
                        </label>

                        <textarea
                            name="note"
                            placeholder="Optional note..."
                            className="w-full border border-[#E5E1D8] rounded-xl px-4 py-3 min-h-24 outline-none focus:border-[#2F855A]"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#2F855A] text-white rounded-full py-3 font-semibold hover:bg-[#276749] transition"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;