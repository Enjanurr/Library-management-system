"use client";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Call backend logout endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are cleared
      });
  
      if (!response.ok) throw new Error("Failed to log out");
  
      // ✅ Clear local storage (for JWT-based authentication)
      localStorage.removeItem("token");
      localStorage.removeItem("login");
     // localStorage.removeItem("registeredUser"); // Remove extra auth state if stored
      //localStorage.removeItem("loggedInUser");
  
      alert("Successfully logged out!");
      router.push("/"); // ✅ Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <section>
      <div className="flex justify-end">
        <div className="flex space-x-4 items-center pt-6 mr-10">
          {/* Hamburger Menu Icon */}
          <GiHamburgerMenu size={30} className="cursor-pointer" />

          {/* Profile Icon */}
          <Dialog>
            <DialogTrigger asChild>
              <FaUserCircle size={30} className="cursor-pointer" />
            </DialogTrigger>
            {/* Bigger Dialog */}
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>My Profile</DialogTitle>
                <div className="flex items-center space-x-2 mt-4">
                  <FaUserCircle size={40} />
                  <h1 className="text-xl font-bold text-black">Pedro Duarte</h1>
                </div>
              </DialogHeader>

              <DialogFooter>
                <Button>Close</Button>
                <Button onClick={handleLogout}>Logout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Profile;
