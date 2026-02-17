"use client";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import deleteRoom from "@/app/actions/deleteRoom";

function DeleteRoomButton({ roomId }) {
  const handleDelete = async () => {
    const confirmd = window.confirm(
      "Are you sure you want to delete this room?",
    );
    if (confirmd) {
      try {
        await deleteRoom(roomId);
        toast.success("Room deleted successfully!");
      } catch (error) {
        console.log("Failed to delete room", error);
        toast.error("Failed to delete room");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-red-500 px-4 py-2 text-center text-white hover:bg-red-700 sm:w-auto"
    >
      <FaTrash /> Delete
    </button>
  );
}

export default DeleteRoomButton;
