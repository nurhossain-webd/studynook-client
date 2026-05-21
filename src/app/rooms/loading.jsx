const Loading = () => {
    return (
        <section className="min-h-screen bg-[#F8F5EF] flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 mx-auto border-4 border-[#E5E1D8] border-t-[#2F855A] rounded-full animate-spin"></div>

                <p className="mt-4 text-[#64748B] font-medium">
                    Loading available rooms...
                </p>
            </div>
        </section>
    );
};

export default Loading;