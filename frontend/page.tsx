import AdminDashboard from "@/components/AdminDashboard";

interface available{
    _id: string;
    title: string;
    author: string;
    description: string;
    available: boolean;
    image?: string;
}
interface unavailable{
    _id: string;
    title: string;
    author: string;
    description: string;
    available: boolean;
    image?: string;
}
export default async function Admin(){
    let availableBooks: available[] = [];
    let unavailableBooks: unavailable[] = [];
try {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/getAllBooks`
      );
   if(!response.ok) throw new Error("Failed to fetch book");

   availableBooks = await response.json();
   unavailableBooks = await response.json();
} catch (error) {
    console.error("Error fetching the books:",error);
}
return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Librarian Dashboard</h1>
        <div className="flex justify-center items-center space-x-2 mr-3">
          <button className="bg-black text-white p-2 rounded-sm" onClick={() => router.push("/")}>Homepage</button>
          <FaUserCircle size={40} className="text-gray-600" />
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 text-white">+ Add Book</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add a New Book</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); addBook(); }}>
              <div className="grid gap-4 py-4">
                <Input placeholder="Book Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} required />
                <Input placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} required />
                <Textarea placeholder="Description" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-500 text-white">Save Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : getBooks.length === 0 ? (
        <p className="text-gray-500">No books available.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold mb-2 text-green-600">Available Books</h2>
            {getBooks.filter((book) => book.available).map((book) => (
              <div key={book._id} className="border p-3 mb-2 rounded-lg shadow bg-white flex justify-between items-center">
                <div>
                  <p className="font-bold">{book.title}</p>
                  <p className="text-gray-700">by {book.author}</p>
                </div>
                <Button onClick={() => removeBook(book._id)} className="bg-red-500 text-white">Remove</Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}