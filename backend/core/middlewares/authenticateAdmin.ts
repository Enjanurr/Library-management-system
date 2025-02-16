import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user?: any; // Attach user object to request
}

interface DecodedToken {
  role: string;
  userId: string;
  iat: number; // JWT issued at timestamp (optional)
  exp: number; // JWT expiration timestamp (optional)
}

export default function authenticateAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Typecasting `decoded` as `DecodedToken` to access `role`
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (decoded.role !== "librarian") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }

    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
