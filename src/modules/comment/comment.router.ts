import express, { Router } from "express";
import { CommentControler } from "./comment.controler";
import auth, { UserRole } from "../../middleWares/auth";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN, UserRole.USER), CommentControler.createComment)

export const commentRouter: Router = router;

