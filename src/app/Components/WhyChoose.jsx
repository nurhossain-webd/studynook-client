import { FaClock, FaShieldAlt, FaDoorOpen } from "react-icons/fa";

const WhyChoose = () => {
    const features = [
        {
            icon: <FaDoorOpen />,
            title: "Private Study Spaces",
            text: "Find quiet rooms for focused reading, group work, or online classes.",
        },
        {
            icon: <FaClock />,
            title: "Hourly Booking",
            text: "Book rooms by date and time slot based on your study schedule.",
        },
        {
            icon: <FaShieldAlt />,
            title: "No Double Booking",
            text: "StudyNook checks booking conflicts before confirming any room.",
        },
    ];

    return (
        <section className="bg-[#F8F5EF] px-4 md:px-8 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-[#2F855A] font-semibold mb-2">Why StudyNook</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                        A Better Way to Find Study Rooms
                    </h2>
                    <p className="text-[#64748B] mt-4 max-w-2xl mx-auto">
                        StudyNook helps students quickly find calm, available, and suitable
                        rooms for productive study sessions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#E5E1D8] rounded-3xl p-7 text-center shadow-sm hover:shadow-md transition"
                        >
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#2F855A] text-white flex items-center justify-center text-2xl mb-5">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-[#102A43] mb-3">
                                {item.title}
                            </h3>

                            <p className="text-[#64748B] leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;