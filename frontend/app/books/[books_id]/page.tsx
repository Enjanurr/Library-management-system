import BookById from "@/components/bookById";

const BookDetailPage = async ({ params }: { params: { books_id: string } }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/home/getBookById/${params.books_id}`,
      {
        cache: "no-store", // 🔥 Ensures fresh data on every request (SSR)
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch book data");
    }

    const data = await response.json();

    if (!data.getBookById) {
      return <div>Book not found</div>;
    }

    return (
      <section>
        <BookById book={data.getBookById}  />{" "}
        {/* ✅ Pass the fetched book data */}
      </section>
    );
  } catch (error) {
    console.error("Error fetching book data:", error);
    return <div>Something went wrong while loading the book.</div>;
  }
};
export default BookDetailPage;
