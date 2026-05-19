import RoomDetailsClient from "@/app/Components/RoomDetailsClient";

const getRoomDetails = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
};

const RoomDetailsPage = async ({ params }) => {
    const { id } = await params;
    const room = await getRoomDetails(id);

    return <RoomDetailsClient room={room} />;
};

export default RoomDetailsPage;