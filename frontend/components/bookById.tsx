"use client";
import { useRouter } from "next/navigation"; // ✅ Removed useParams
import { useEffect, useState } from "react";
import GoToHomePage from "./goToHomepage";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  image?: string;
}

const BookById = ({ book }: { book: Book }) => {
  const router = useRouter();
  const book_id = book?._id; // ✅ Extract book_id from book

  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Decode JWT and extract userId
  const decodeJWT = (token: string) => {
    try {
      const payloadBase64 = token.split(".")[1]; // Extract payload
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode from Base64
      return decodedPayload.userId; // ✅ Extract userId
    } catch (error) {
      console.error("Invalid Token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = decodeJWT(token);
      setUserId(id);
    }

    console.log("Extracted book_id:", book_id);
  }, [book]); // ✅ Only depends on book

  // ✅ Handle Borrow Function
  const handleBorrow = async () => {
    console.log("Attempting to borrow book - userId:", userId, "book_id:", book_id);

    if (!userId || !book_id) {
      console.error(`Missing values - userId: ${userId}, book_id: ${book_id}`);
      alert("Something went wrong! Missing userId or book_id.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/home/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ book_Id: book_id, userId }), // ✅ Corrected payload key
      });

      const data = await response.json();

      if (response.ok) {
        alert("Book borrowed successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to borrow book:", error);
      alert("An error occurred while borrowing the book.");
    }
  };

  if (!book) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <section className="relative min-h-screen bg-gray-100 flex flex-col items-center pt-6">
      {/* ✅ Go Back Button */}
      <div className="w-full max-w-5xl px-4 mb-4">
       <GoToHomePage />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg border border-gray-300">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left: Book Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={book.image} alt={book.title} className="w-80 h-96 object-cover rounded-lg shadow-md" />
          </div>

          {/* Right: Book Details */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
            <h2 className="text-xl text-gray-600">by {book.author}</h2>
            <p className="text-lg text-gray-700">{book.description}</p>

            {/* Borrow Button */}
            <div className="mt-6">
              <button
                onClick={handleBorrow}
                className="w-full md:w-auto px-8 py-3 bg-black text-white font-semibold text-lg rounded-md shadow-lg hover:bg-gray-800 transition"
              >
                Borrow Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookById;
