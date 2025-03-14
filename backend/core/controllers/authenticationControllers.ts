import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../initializer/database";
dotenv.config();

interface Identity {
  userName: string;
  email: string;
  password: string;
  role?: string;
}

export const register = async (
  req: Request<{}, {}, Identity>,
  res: Response<any>
): Promise<any> => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: req.body.role || "student",
    });

    await newUser.save();

    return res.status(201).json({
      message: "Registration successful",
      user_id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in creating an account" });
  }
};

interface userLogin {
  email: string;
  password: string;
}
export const login = async (
  req: Request<{}, {}, userLogin>,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password); // if bug check this
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    /*if (user.role !== "librarian") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }*/
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Payload (can include userId, role, etc.)
      process.env.ACCESS_JWT_SECRET || "error", // Secret key (should be in .env file)
      { expiresIn: "1h" } // Token expiration time
    );
    // console.log(token);
    return res.status(200).json({
      message: "Login successful",
      token, // Send the token to the client
      //userId: user._id, // Optional: You can send the userId if needed
      //  role: user.role,  // Optional: You can send the user's role if needed
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out Successfully" });
};
