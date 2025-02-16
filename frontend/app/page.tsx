import { Card } from "@/components/ui/card";
import Readmore from "@/components/Readmore";
import Profile from "@/components/profile";
import Search from "@/components/search";
  

interface Book {
  _id: number;
  title: string;
  author: string;
  description: string;
  available: boolean;
  image?: string;
}

export default async function HomePage() {

  
  let books: Book[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/home/getAllBooks`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    
    // Ensure the response is an array before assigning
    if (Array.isArray(data)) {
      books = data;
    } else {
      console.error("Unexpected API response:", data);
    }
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

               <Readmore />
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
