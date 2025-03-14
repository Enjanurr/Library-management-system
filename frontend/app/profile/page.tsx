import { FaUserCircle } from "react-icons/fa"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

export default async function ProfileSection (){
    return (
        <section className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-[400px]">
          <h1 className="text-xl font-semibold text-center mb-4">
            Personal Information
          </h1>
  
          {/* Profile Icon */}
          <div className="flex justify-center mb-4">
            <FaUserCircle size={60} className="text-gray-500" />
          </div>
  
          {/* Form Section */}
          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              placeholder="Enter Email"
              className="border rounded-md p-2 w-full"
            />
            <Input
              id="email"
              name="email"
              placeholder="Confirm Email"
              className="border rounded-md p-2 w-full"
            />
  
          </div>
            {/* ✅ Update Profile Button */}
        <div className="mt-6">
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Update Profile
          </Button>
        </div>
        </div>
      </section>
    )
}