import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import DeleteRoomButton from "./DeleteRoomButton";
function MyRoomCard({ room }) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : "/no-image.jpg";

  return (
    <div className="mt-4 flex flex-col items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow sm:flex-row">
      <div className="flex flex-row gap-3 items-center">
        <Image
          src={imageSrc}
          width={400}
          height={100}
          alt={room.name}
          className="w-full sm:w-15 sm:h-15  object-cover rounded-md"
        />

        <div className="">
          <h4 className="text-lg font-semibold text-zinc-100">{room.name}</h4>
          <p className="line-clamp-1 text-sm text-zinc-400">
            {room.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${room.$id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700 flex gap-2 items-center"
        >
          <FaEye /> View
        </Link>
        <DeleteRoomButton roomId={room.$id} />
      </div>
    </div>
  );
}

export default MyRoomCard;
