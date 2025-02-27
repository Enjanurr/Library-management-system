import GoToHomePage from "@/components/goToHomepage";
import RemoveBook from "@/components/removeBook";
import ReturnedBook from "@/components/returnedBook";
import AddBook from "@/components/addBooks";
interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  available: boolean;
  image?: string;
}

export default async function Admin() {
  let books: Book[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/getAllBooks`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    books = data.books || [];
  } catch (error) {
    console.error("Error in fetching books:", error);
  }

  const availableBooks = books.filter((book) => book.available);
  const unavailableBooks = books.filter((book) => !book.available);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
             <h1 className="text-2xl font-bold">Librarian Dashboard</h1>
      {/* Header Section */}
      <div className="w-full max-w-full flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
   
        <div className="flex gap-4">
          <GoToHomePage />
         
        </div>
        <AddBook />
      </div>

      {/* Books List Section */}
      <div className="w-full max-w-full  bg-white p-6 rounded-lg shadow-md">
        {books.length === 0 ? (
          <p className="text-gray-500 text-center">No books available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Available Books */}
            <div className="border p-6 rounded-lg bg-white shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-green-600">
                Available Books
              </h2>
              {availableBooks.length === 0 ? (
                <p className="text-gray-500">No available books.</p>
              ) : (
                availableBooks.map((book) => (
                  <div
                    key={book._id}
                    className="border p-4 mb-4 rounded-lg shadow-sm bg-white flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{book.title}</p>
                      <p className="text-gray-700">by {book.author}</p>
                    </div>
                    <RemoveBook bookId={book._id} />
                  </div>
                ))
              )}
            </div>

            {/* Unavailable Books */}
            <div className="border p-6 rounded-lg bg-white  shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-red-600">
                Unavailable Books
              </h2>
              {unavailableBooks.length === 0 ? (
                <p className="text-gray-500">No unavailable books.</p>
              ) : (
                unavailableBooks.map((book) => (
                  <div
                    key={book._id}
                    className="border p-4 mb-4 rounded-lg shadow-sm bg-white flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{book.title}</p>
                      <p className="text-gray-700">by {book.author}</p>
                    </div>
                    <ReturnedBook bookId={book._id} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
