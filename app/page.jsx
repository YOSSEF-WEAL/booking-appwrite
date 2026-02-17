import RoomCard from "@/components/RoomCard";
import Heading from "@/components/Heading";
import getAllRooms from "./actions/getAllRooms";

export default async function Home() {
  const rooms = await getAllRooms();

  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        <div className="mt-4 space-y-4">
          {rooms.map((room) => (
            <RoomCard key={room.$id} room={room} />
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">No rooms available at the moment</p>
      )}
    </>
  );
}
