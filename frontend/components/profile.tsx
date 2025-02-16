'use client'
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`);
    alert("Successfully logged out");
    window.location.reload();
  } catch (error) {
    console.error("Failed to logout", error);
  }
};

const Profile = () => {
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
                {/* ✅ Changed from DialogDescription (p tag) to div */}
                <div className="flex items-center space-x-2 mt-4">
                  <FaUserCircle size={40} />
                  <h1 className="text-xl font-bold text-black">Pedro Duarte</h1>
                </div>
              </DialogHeader>

              <DialogFooter>
                <div>
                  <Button>Close</Button>
                  <Button onClick={logout}>Logout</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Profile;
