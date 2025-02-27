"use client";
import { Button } from "./ui/button";

const ReturnedBook = ({ bookId }: { bookId: string }) => {
  const markAsReturned = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/updateBook/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ book_Id: id }), // ✅ Only send book ID
        }
      );
  
      if (!response.ok) throw new Error("Failed to update book");
  
      window.location.reload(); // Refresh page after update
    } catch (error) {
      console.error("Error in updating book status:", error);
    }
  };
  
  return (
    <div>
      <Button onClick={() => markAsReturned(bookId)} className="bg-green-500 text-white">
        Mark as Returned
      </Button>
    </div>
  );
};

export default ReturnedBook;
