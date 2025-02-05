import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export default function protectRoute(req: Request, res: Response) {
  
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // ! is a  Type assertion to guarantee it's not undefined
   
    (req as any).user = decoded;
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
