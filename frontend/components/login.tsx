'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const LoginDialog=()=>{
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isClient, setIsClient] = useState(false); // Track hydration
  
    // Ensure we check localStorage only on the client
    useEffect(() => {
      setIsClient(true);
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          router.replace("/");
        }
      }
    }, [router]);
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          setErrorMessage(errorData.message || "Login Failed");
          return;
        }
  
        const data = await res.json();
        localStorage.setItem("token", data.token);
        router.push("/");
  
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };
  
    // Disable button if input is empty
    const isFormValid = email.trim() && password.trim();
  
    return (
      <section className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center">
          {isClient && ( // Ensure rendering only after hydration
            <form onSubmit={handleLogin}>
              <Card className="w-[400px]">
                <CardHeader className="flex items-center">
                  <CardTitle className="text-3xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                  )}
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Button
                    className={`w-[350px] ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!isFormValid}
                    type="submit"
                  >
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </div>
      </section>
    );
}
export default LoginDialog;