"use client";
import { Button } from "./ui/button";

const RemoveBook = ({ bookId }: { bookId: string }) => {
  const removeBook = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/removeBook/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to remove book");

      window.location.reload(); // Refresh page after deletion
    } catch (error) {
      console.error("Error in removing a book:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => removeBook(bookId)} className="bg-red-500 text-white">
        Remove
      </Button>
    </div>
  );
};

export default RemoveBook;
