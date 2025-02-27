"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterDialog = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Track hydration

  useEffect(() => {
    setIsClient(true); // Ensures hydration before accessing localStorage

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/auth/login");
      }
    }
  }, [router]);

  const isFormValid = email.trim() && userName.trim() && password.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const body = { userName, email, password };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
  
      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "Registration Failed");
        return;
      }
  
      const data = await res.json();
      console.log("Registration success", data);
  
      // ✅ Save registeredUser status in localStorage
      localStorage.setItem("registeredUser", "true");
  
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration error", error);
      setErrorMessage("An unexpected error occurred");
    }
  };
  

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex justify-center">
        <Card className="w-[400px]">
          <CardHeader className="flex items-center">
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription>Fill in all fields to register</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Only render UI when hydration is complete */}
            {isClient && (
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  {/* Username Input */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="userName">Username</Label>
                    <Input
                      id="userName"
                      name="userName"
                      placeholder="Enter Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  {/* Email Input */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* Password Input */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  className="w-[350px] mt-9"
                  disabled={!isFormValid}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            )}
          </CardContent>
          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
          <CardFooter className="flex items-center justify-center"></CardFooter>
        </Card>
      </div>
    </section>
  );
};
export default RegisterDialog;
