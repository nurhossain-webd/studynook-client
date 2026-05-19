"use client";

import { FaTimes, FaTrash } from "react-icons/fa";

const DeleteConfirmModal = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-[#E5E1D8] shadow-xl p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F8F5EF] text-[#102A43] flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition"
                >
                    <FaTimes />
                </button>

                <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto mb-5">
                    <FaTrash />
                </div>

                <h2 className="text-2xl font-bold text-[#102A43] text-center">
                    Delete Room?
                </h2>

                <p className="text-[#64748B] text-center mt-3">
                    This room will be permanently deleted. This action cannot be undone.
                </p>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="w-full px-5 py-3 rounded-full border border-[#2F855A] text-[#2F855A] font-semibold hover:bg-[#2F855A] hover:text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="w-full px-5 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;