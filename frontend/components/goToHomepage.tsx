"use client"; // Required since you're using useRouter (a client hook)
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const GoToHomePage = () => {
  const router = useRouter();

  return ( // Added return statement
    <div className="flex justify-center items-center space-x-2 mr-3">
      <button className="bg-black text-white p-2 rounded-sm" onClick={() => router.push("/")}>
        Homepage
      </button>
      <FaUserCircle size={40} className="text-gray-600" />
    </div>
  );
};

export default GoToHomePage;
