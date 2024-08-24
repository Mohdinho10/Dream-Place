import { Router } from "express";
import {
  deleteUser,
  getNotifications,
  getUser,
  getUsers,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

// Auth
router.post("/register", register);
router.post("/login", login);
// User crud
router.get("/", getUsers);
router.use(isAuthenticated);
router.post("/logout", logout);
router.get("/notification", isAuthenticated, getNotifications);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
