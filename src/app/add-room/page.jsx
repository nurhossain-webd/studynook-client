"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    TextArea,
} from "@heroui/react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const amenitiesList = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

const AddRoomPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        document.title = "StudyNook – Add Room";
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first");
            router.push("/login");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const newRoom = Object.fromEntries(formData.entries());

        newRoom.amenities = formData.getAll("amenities");
        newRoom.capacity = Number(newRoom.capacity);
        newRoom.hourlyRate = Number(newRoom.hourlyRate);

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
            toast.error("Authentication token missing");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(newRoom),
            });

            if (!res.ok) {
                toast.error("Failed to add room");
                return;
            }

            toast.success("Room added successfully");
            router.push("/my-listings");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="min-h-screen bg-[#F8F5EF] px-4 py-16">
            <div className="max-w-3xl mx-auto bg-white border border-[#E5E1D8] rounded-3xl shadow-sm p-8">
                <div className="text-center mb-8">
                    <p className="text-[#2F855A] font-semibold mb-2">Add New Room</p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                        List Your Study Room
                    </h1>

                    <p className="text-[#64748B] mt-3">
                        Add room details so students can find and book your study space.
                    </p>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <TextField isRequired name="roomName" type="text">
                        <Label className="text-[#102A43] font-medium">Room Name</Label>
                        <Input
                            placeholder="Quiet Focus Room"
                            className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                        />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="description">
                        <Label className="text-[#102A43] font-medium">Description</Label>
                        <TextArea
                            placeholder="Write a short room description..."
                            className="border border-[#E5E1D8] rounded-xl px-4 py-3 min-h-28"
                        />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="image" type="text">
                        <Label className="text-[#102A43] font-medium">Image URL</Label>
                        <Input
                            placeholder="https://example.com/room.jpg"
                            className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                        />
                        <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <TextField isRequired name="floor" type="text">
                            <Label className="text-[#102A43] font-medium">Floor</Label>
                            <Input
                                placeholder="3rd Floor"
                                className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                            />
                            <FieldError />
                        </TextField>

                        <TextField isRequired name="capacity" type="number">
                            <Label className="text-[#102A43] font-medium">Capacity</Label>
                            <Input
                                placeholder="4"
                                min={1}
                                className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                            />
                            <FieldError />
                        </TextField>

                        <TextField isRequired name="hourlyRate" type="number">
                            <Label className="text-[#102A43] font-medium">Hourly Rate</Label>
                            <Input
                                placeholder="5"
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
                        Add Room
                    </Button>
                </Form>
            </div>
        </section>
    );
};

export default AddRoomPage;