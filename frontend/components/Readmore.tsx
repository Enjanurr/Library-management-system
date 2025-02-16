'use client';
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
const Readmore = () =>{
const router = useRouter();

const viewBook = () => {
  router.push('/')
}
  return(
    <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800" onClick={viewBook}> {/* or ()=> router.push('/') */}
    Read More
  </Button>
  )
}
export default Readmore;