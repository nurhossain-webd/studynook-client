"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const amenitiesList = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

const UpdateRoomModal = ({ room, onClose }) => {
    if (!room) return null;

    const handleUpdateRoom = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedRoom = Object.fromEntries(formData.entries());

        updatedRoom.amenities = formData.getAll("amenities");
        updatedRoom.capacity = Number(updatedRoom.capacity);
        updatedRoom.hourlyRate = Number(updatedRoom.hourlyRate);
        updatedRoom.updatedAt = new Date();

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
            toast.error("Authentication token missing");
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                    body: JSON.stringify(updatedRoom),
                }
            );

            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(result.message || "Failed to update room");
                return;
            }

            toast.success("Room updated successfully");
            onClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E5E1D8] shadow-xl relative p-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F8F5EF] text-[#102A43] flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition"
                >
                    <FaTimes />
                </button>

                <div className="text-center mb-8">
                    <p className="text-[#2F855A] font-semibold mb-2">Update Room</p>
                    <h2 className="text-3xl font-bold text-[#102A43]">
                        Edit Your Study Room
                    </h2>
                    <p className="text-[#64748B] mt-3">
                        Update the room information and save the latest details.
                    </p>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={handleUpdateRoom}>
                    <TextField
                        isRequired
                        name="roomName"
                        type="text"
                        defaultValue={room.roomName}
                    >
                        <Label className="text-[#102A43] font-medium">Room Name</Label>
                        <Input className="border border-[#E5E1D8] rounded-xl px-4 py-3" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="description"
                        defaultValue={room.description}
                    >
                        <Label className="text-[#102A43] font-medium">Description</Label>
                        <TextArea className="border border-[#E5E1D8] rounded-xl px-4 py-3 min-h-28" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="image"
                        type="text"
                        defaultValue={room.image}
                    >
                        <Label className="text-[#102A43] font-medium">Image URL</Label>
                        <Input className="border border-[#E5E1D8] rounded-xl px-4 py-3" />
                        <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <TextField
                            isRequired
                            name="floor"
                            type="text"
                            defaultValue={room.floor}
                        >
                            <Label className="text-[#102A43] font-medium">Floor</Label>
                            <Input className="border border-[#E5E1D8] rounded-xl px-4 py-3" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="capacity"
                            type="number"
                            defaultValue={String(room.capacity)}
                        >
                            <Label className="text-[#102A43] font-medium">Capacity</Label>
                            <Input
                                min={1}
                                className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                            />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="hourlyRate"
                            type="number"
                            defaultValue={String(room.hourlyRate)}
                        >
                            <Label className="text-[#102A43] font-medium">Hourly Rate</Label>
                            <Input
                                min={1}
                                className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    <div>
                        <Label className="text-[#102A43] font-medium mb-3 block">
                            Amenities
                        </Label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {amenitiesList.map((amenity) => (
                                <label
                                    key={amenity}
                                    className="flex items-center gap-3 border border-[#E5E1D8] rounded-xl px-4 py-3 cursor-pointer hover:border-[#2F855A] transition"
                                >
                                    <input
                                        type="checkbox"
                                        name="amenities"
                                        value={amenity}
                                        defaultChecked={room.amenities?.includes(amenity)}
                                        className="accent-[#2F855A]"
                                    />
                                    <span className="text-[#1E293B]">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#2F855A] text-white rounded-full py-3 font-semibold hover:bg-[#276749] transition flex items-center justify-center gap-2 mt-4"
                    >
                        <Check width={18} height={18} />
                        Update Room
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdateRoomModal;