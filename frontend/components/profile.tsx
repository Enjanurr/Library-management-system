"use client";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  // ✅ Function to decode JWT and get userId
  const decodedJWT = (token: string) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload.userId;
    } catch (error) {
      console.error("Invalid Token:", error);
      return null;
    }
  };

  // ✅ Fetch user profile when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = decodedJWT(token);
      setUserId(id);

      // ✅ Fetch user profile from the backend
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/home/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User Profile:", data);
          setUserData(data);
        })
        .catch((error) => console.error("Failed to fetch profile:", error));
    }
  }, []);

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to log out");

      localStorage.removeItem("token");
      localStorage.removeItem("login");

      alert("Successfully logged out!");
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const loggedout = localStorage.getItem("login");

  // ✅ Redirect to login page
  const login = async () => {
    router.push("/auth/login");
  };

  // ✅ Redirect to Profile Page
  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <section>
      <div className="flex justify-end">
        <div className="flex space-x-4 items-center pt-6 mr-10">
          {/* Hamburger Menu Icon */}
          <GiHamburgerMenu size={30} className="cursor-pointer" />

          {/* Profile Icon */}
          <Popover>
            <PopoverTrigger asChild>
              <FaUserCircle
                size={30}
                className="cursor-pointer text-white  hover:text-gray-300 transition-all"
              />
            </PopoverTrigger>
            {/* ✅ Now the Popover opens below the Profile Icon */}
            <PopoverContent className="w-64 mt-2 shadow-lg border rounded-lg bg-white">
              {userData ? (
                <div>
                  {/* ✅ User Profile */}
                  <div className="flex items-center space-x-2 p-4">
                    <FaUserCircle size={40} />
                    <div>
                      <h1 className="text-xl font-bold text-black">
                        {userData.userName}
                      </h1>
                      <p className="text-gray-500 text-sm">{userData.email}</p>
                    </div>
                  </div>

                  {/* ✅ Manage Account Button */}
                  <div className="p-2 border-t">
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 mb-2"
                      onClick={goToProfile}
                    >
                      Manage Account
                    </Button>
                  </div>

                  {/* ✅ Logout Button */}
                  <div className="p-2 border-t">
                    {}
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600"
                      onClick={handleLogout}
                      disabled={loggedout === "false"}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center">
                  {/* ✅ Show Login Button only if not logged in */}
                  <p className="text-gray-500 text-sm mb-2">
                    You are not logged in.
                  </p>
                  <Button className="w-full" onClick={login}>
                    Login
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
};

export default Profile;
