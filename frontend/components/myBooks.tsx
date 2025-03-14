"use client";
import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;

}

interface BorrowedBook {
  _id: string;
  book: Book;  // ✅ Book is now nested inside BorrowedBook
  status: string;
  available:boolean;
  title:string;
  author:string;
}

const MyBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Function to decode JWT and extract userId
  const decodedJWT = (token: string) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload.userId;
    } catch (error) {
      console.error("Invalid Token:", error);
      return null;
    }
  };

  // ✅ Fetch user profile when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = decodedJWT(token);
      setUserId(id);

      // ✅ Fetch user profile from the backend
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/home/borrowedBooks/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Borrowed books", data); // ✅ Debugging log
          setBorrowedBooks(data);
        })
        .catch((error) => console.error("Failed to fetch borrowed books:", error));
    }
  }, []);

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-semibold mb-4 text-center">
          📚 Borrowed Books
        </h1>

        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((book) => (
            <div
              key={book._id}
              className="border p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                {/* ✅ Correctly access the nested book fields */}
                <p className="font-bold text-lg">
                  {book.title || "No Title"}
                </p>
                <p className="text-gray-700 text-sm">
                  by {book.author || "Unknown"}
                </p>
              </div>
<span
  className={`px-4 py-2 rounded-md text-white text-sm ${
    book.available ? "bg-green-500" : "bg-red-500"
  }`}
>
  {book.available ? "Returned" : "Borrowed"}
</span>


            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No borrowed books yet.</p>
        )}
      </div>
    </section>
  );
};

export default MyBooks;
        