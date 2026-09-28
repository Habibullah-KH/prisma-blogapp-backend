import express, { Router } from "express";
import { CommentControler } from "./comment.controler";
import auth, { UserRole } from "../../middleWares/auth";

const router = express.Router();

router.get("/:commentId", CommentControler.getCommentbyId)

router.get("/author/:authorId", CommentControler.getCommentByAuthor)

router.post("/", auth(UserRole.ADMIN, UserRole.USER), CommentControler.createComment)

//1. nijer comment only nijai comment korte parbe
//login thakhte hobe
router.delete("/:commentId", auth(UserRole.ADMIN, UserRole.USER), CommentControler.deleteComment)

//1. nijer comment only nijai comment korte parbe
//login thakhte hobe
router.patch("/:commentId", auth(UserRole.ADMIN, UserRole.USER), CommentControler.updateComment)



export const commentRouter: Router = router;

