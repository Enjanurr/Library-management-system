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
): void { // Ensure function explicitly returns void
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return; // Ensure function exits
  }

  try {
    // Typecasting `decoded` as `DecodedToken` to access `role`
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (decoded.role !== "librarian") {
      res.status(403).json({ message: "Access denied. Admins only" });
      return; // Ensure function exits
    }

    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
