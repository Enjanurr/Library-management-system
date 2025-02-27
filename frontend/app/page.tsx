import { Card } from "@/components/ui/card";
import Readmore from "@/components/Readmore";
import Profile from "@/components/profile";
import Search from "@/components/search";

// Define the Book interface
interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  available: boolean;
  image?: string;
}

export default async function HomePage() {
  let books: Book[] = []; // Store books here

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/home/getAllBooks`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch books");

     // a note to my self ,don't declare this as a const haha.....
     books = await response.json(); // Store the response data in `books` can be used in the map function later  

  } catch (error) {
    console.error("Error fetching books:", error);
  }

  return (
    <section>
      {/* Header */}
      <div className="bg-black flex justify-start items-start p-4">
        <h1 className="text-white text-2xl">LIB</h1>
      </div>

      <Profile />
      <Search />

      {/* Book List */}
      <div className="flex flex-wrap justify-center gap-6 pt-10">
        {books.length > 0 ? (
          books.map((book) => (
            <Card key={book._id} className="w-72 p-4 shadow-lg rounded-md border border-gray-200">
              <img
                src={book.image || "atomic.jpg"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-600 text-sm">{book.author}</p>
                <p className="mt-2 text-gray-500">{book.description}</p>

                <Readmore books_id={book._id} /> {/* Extract the book id */}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No books available.</p>
        )}
      </div>
    </section>
  );
}
