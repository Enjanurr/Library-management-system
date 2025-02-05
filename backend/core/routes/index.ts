import express from "express";
import authenticationRoutes from "./authenticationRoutes";
//import userRoutes from "./userRoutes";

const router = express.Router();

// Use the individual route files
router.use("/auth", authenticationRoutes);
//router.use("/user", userRoutes);

export default router;
