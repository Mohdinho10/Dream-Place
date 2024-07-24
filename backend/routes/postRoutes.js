import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getProfilePost,
  savePost,
  updatePost,
} from "../controllers/postController.js";

const router = Router();

router.get("/", getPosts);
router.get("/profile", isAuthenticated, getProfilePost);
router.post("/", isAuthenticated, addPost);
router.post("/save", isAuthenticated, savePost);
router
  .route("/:id")
  .get(getPost)
  .put(isAuthenticated, updatePost)
  .delete(isAuthenticated, deletePost);

export default router;
