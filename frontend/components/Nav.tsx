'use client'
import { useRouter } from "next/navigation";
import Profile from "./profile";
import { useEffect, useState } from "react";

const Nav = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<any>(null);

  // ✅ Decode JWT Token
  const decodedJWT = (token: string) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.role;
    } catch (error) {
      console.error("Invalid Token", error);
      return null;
    }
  };

  // ✅ Check Token and Set Role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = decodedJWT(token);
      setUserRole(role);
    }
  }, []);

  // ✅ Navigation Functions
  const myBook = () => {
    router.push("/myBooks");
  };

  const admin = () => {
    router.push('/admin');
  }

  return (
    <section className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        
        {/* ✅ Left Section (Logo) */}
        <h1 
          className="text-white text-2xl font-bold cursor-pointer hover:text-gray-300 transition-all"
          onClick={() => router.push("/")}
        >
          LIB
        </h1>

        {/* ✅ Center Section (Navigation Links) */}
        <div className="flex space-x-6">
          <h1 
            className="text-white text-lg cursor-pointer hover:text-gray-300 transition-all"
            onClick={myBook}
          >
            My Books
          </h1>

          {userRole === "librarian" && (
            <h1 
              className="text-white text-lg cursor-pointer hover:text-gray-300 transition-all"
              onClick={admin}
            >
              Admin Panel
            </h1>
          )}
        </div>

        {/* ✅ Right Section (Login + Profile) */}
        <div className="flex items-center space-x-4">
          <h1 
            className="text-white text-lg cursor-pointer hover:text-gray-300 transition-all"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </h1>
          <Profile />
        </div>
      </div>
    </section>
  );
}

export default Nav;
