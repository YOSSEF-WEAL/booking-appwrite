import Image from "next/image";
import React from "react";

function RoomImage({ room, className = "", alt, width = 400, height = 100 }) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room?.image}/view?project=${projectId}`;
  const imageSrc = room?.image ? imageUrl : "/no-image.jpg";

  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      alt={alt || room?.name || "Room image"}
      className={className}
    />
  );
}

export default RoomImage;
