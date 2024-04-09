
const BookingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <main className="pt-5 md:pt-5 px-5 max-w-6xl 2xl:max-w-screen-xl
        items-start">
                {children}
        </main>
    );
};


export default BookingLayout;