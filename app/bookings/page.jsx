import Heading from "@/components/Heading";
import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from "@/components/BookedRoomCard";
async function BookingsPage() {
  const bookings = await getMyBookings();

  return (
    <>
      <Heading title="Bookings" />
      {bookings.length === 0 ? (
        <>
          <p className="text-zinc-400">You have no bookings</p>
        </>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  );
}

export default BookingsPage;
