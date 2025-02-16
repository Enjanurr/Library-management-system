import express from "express";
import authenticationRoutes from "./authenticationRoutes";
import adminRoutes from './adminRoutes'
import homeRoutes from './homeRoutes';
//import userRoutes from "./userRoutes";

const router = express.Router();

// Use the individual route files
router.use("/auth", authenticationRoutes);
router.use("/admin",adminRoutes);
router.use("/home",homeRoutes);
//router.use("/user", userRoutes);

export default router;
