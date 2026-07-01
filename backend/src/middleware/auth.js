import { requireAuth } from "@clerk/express";
import { User } from "../models/user.js";
import { ENV } from "../config/env.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      //req.auth() hyde fne estaamla laanu staamle clerkMiddlware bl serverjs
      const clerkId = req.auth().userId;

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized-invalid token" });
      }
      const user = await User.findOne({ clerkId: clerkId });

      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      req.user = user;
      next();
    } catch (err) {
      console.error("Error in protect Route middlware", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ messge: "Unauthorized - user not found" });
  }
  if (req.user.email !== ENV.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden-admin access only" });
  }
  next();
};
