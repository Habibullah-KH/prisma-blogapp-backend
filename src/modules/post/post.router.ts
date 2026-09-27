import express, { Router } from "express";
import { PostControler } from "./post.controler";
import auth, { UserRole } from "../../middleWares/auth";

const router = express.Router();

router.get("/", PostControler.getAllPost)
router.get("/:postId", PostControler.getPostById)

router.post("/", auth(UserRole.USER), PostControler.createPost);

export const postRouter: Router = router;
