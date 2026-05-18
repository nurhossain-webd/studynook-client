const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Browse Rooms",
            text: "Explore available study rooms with details like floor, capacity, rate, and amenities.",
        },
        {
            number: "02",
            title: "Choose Time Slot",
            text: "Select your preferred date, start time, and end time for the room.",
        },
        {
            number: "03",
            title: "Confirm Booking",
            text: "Submit your booking and get confirmation if the room is available.",
        },
    ];

    return (
        <section className="bg-white px-4 md:px-8 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-[#2F855A] font-semibold mb-2">Simple Process</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#102A43]">
                        How StudyNook Works
                    </h2>
                    <p className="text-[#64748B] mt-4 max-w-2xl mx-auto">
                        Book a study room in a few easy steps without confusion or double
                        booking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative bg-[#F8F5EF] border border-[#E5E1D8] rounded-3xl p-8 min-h-[240px] text-center"
                        >
                            <span className="text-5xl font-bold text-[#2F855A]">
                                {step.number}
                            </span>

                            <h3 className="text-xl font-bold text-[#102A43] mt-5 mb-3">
                                {step.title}
                            </h3>

                            <p className="text-[#64748B] leading-relaxed">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;