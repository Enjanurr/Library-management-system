'use client';
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const AddBook = () => {
  // ✅ State to store new book details
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
  });

  // ✅ Async function to handle book submission
  const addBook = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/addBooks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBook),
        }
      );

      if (!response.ok) throw new Error("Failed to add book");

      const data = await response.json();
      console.log("Book added successfully:", data);

      // ✅ Reset form fields after successful submission
      setNewBook({ title: "", author: "", description: "" });

    } catch (error) {
      console.error("Failed to add a book:", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-500 text-white">+ Add Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a New Book</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addBook();
            }}
          >
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Book Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                required
              />
              <Input
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white">
                Save Book
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBook;
