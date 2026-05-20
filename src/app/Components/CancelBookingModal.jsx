"use client";

import { FaTimes } from "react-icons/fa";

const CancelBookingModal = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-[#E5E1D8] shadow-xl p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F8F5EF] text-[#102A43] flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition"
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-bold text-[#102A43] text-center">
                    Cancel Booking?
                </h2>

                <p className="text-[#64748B] text-center mt-3">
                    Are you sure you want to cancel this study room booking?
                </p>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="w-full px-5 py-3 rounded-full border border-[#2F855A] text-[#2F855A] font-semibold hover:bg-[#2F855A] hover:text-white transition"
                    >
                        No
                    </button>

                    <button
                        onClick={onConfirm}
                        className="w-full px-5 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                        Yes, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelBookingModal;