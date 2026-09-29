import express, { Router } from "express";
import { PostControler } from "./post.controler";
import auth, { UserRole } from "../../middleWares/auth";

const router = express.Router();

router.get("/", PostControler.getAllPost);

router.get(
  "/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  PostControler.getMyPost,
);

router.get("/statistics", auth(UserRole.USER, UserRole.ADMIN), PostControler.getStatistics);

router.get("/:postId", PostControler.getPostById);


router.post("/", auth(UserRole.USER, UserRole.ADMIN), PostControler.createPost);

router.patch(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  PostControler.updatePost,
);

router.delete(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  PostControler.deltePost,
);

export const postRouter: Router = router;
