'use client';
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

// make the props a string/number
// 
const Readmore = ({books_id}:{books_id:string}) =>{
const router = useRouter();

const viewBook = () => {
  router.push(`/books/${books_id}`); // Redirect to the dynamic book detail page
};
  return(
    <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800" onClick={viewBook}> {/* or ()=> router.push('/') */}
    Read More
  </Button>
  )
}
export default Readmore;