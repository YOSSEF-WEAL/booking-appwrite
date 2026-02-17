import Link from "next/link";
import { FaEye } from "react-icons/fa";
import DeleteRoomButton from "./DeleteRoomButton";
import RoomImage from "./RoomImage";
function MyRoomCard({ room }) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow sm:flex-row sm:items-center">
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <RoomImage
          room={room}
          className="h-40 w-full rounded-md object-cover sm:h-20 sm:w-20"
        />

        <div className="min-w-0">
          <h4 className="text-lg font-semibold text-zinc-100">{room.name}</h4>
          <p className="line-clamp-1 text-sm text-zinc-400">
            {room.description}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-0 sm:space-x-2">
        <Link
          href={`/rooms/${room.$id}`}
          className="flex w-full items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700 sm:w-auto"
        >
          <FaEye /> View
        </Link>
        <DeleteRoomButton roomId={room.$id} />
      </div>
    </div>
  );
}

export default MyRoomCard;
