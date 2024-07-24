import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import prisma from "../utils/prisma.js";

// Protected routes
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId = payload.id;

    next();
  });
});
