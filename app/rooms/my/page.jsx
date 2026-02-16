import Heading from "@/components/Heading";
import getMyRooms from "@/app/actions/getMyRooms";
import MyRoomCard from "@/components/MyRoomCard";

export default async function MyRoomsPage() {
  const rooms = await getMyRooms();
  console.log("🚀 ~ MyRoomsPage ~ rooms:", rooms);
  return (
    <>
      <Heading title={"My Rooms"} />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <p className="text-zinc-400">You have no room listings</p>
      )}
    </>
  );
}
