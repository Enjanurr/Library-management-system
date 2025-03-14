import Nav from "@/components/Nav";
import MyBooks from "@/components/myBooks";


export default async function MyBook() {
  return (
    <section className="min-h-screen bg-gray-100">
      <Nav />
    <MyBooks />
    </section>
  );
}
