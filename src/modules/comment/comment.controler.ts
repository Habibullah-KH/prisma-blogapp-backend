import { Request, Response } from "express";
import { CommentServices } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id
    const result = await CommentServices.createComment(req.body);
    res.status(201).json({
      success: true,
      message: "Data insert successfully !!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getCommentbyId = async (req: Request, res: Response) => {
  try {
    const {commentId} = req.params;
    const result = await CommentServices.getCommentById(commentId as string);
    res.status(201).json({
      success: true,
      message: "Data get successfully !!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const getCommentByAuthor = async (req: Request, res: Response) => {
  try {
    const {authorId} = req.params;
    const result = await CommentServices.getCommentByAuthor(authorId as string);
    res.status(201).json({
      success: true,
      message: "Data get successfully !!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const {commentId} = req.params;
    const result = await CommentServices.deleteComment(commentId as string, user?.id as string);
    res.status(201).json({
      success: true,
      message: "comment delete successfully !!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const {commentId} = req.params;
    const result = await CommentServices.updateComment(commentId as string, user?.id as string, req.body);
    res.status(201).json({
      success: true,
      message: "comment update successfully !!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const moderateComment = async (req: Request, res: Response) => {
  try {
    const {commentId} = req.params;
    const result = await CommentServices.moderateComment(commentId as string, req.body);
    res.status(201).json({
      success: true,
      message: "comment update successfully !!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};



export const CommentControler = {
    createComment,
    getCommentbyId,
    getCommentByAuthor,
    deleteComment,
    updateComment,
    moderateComment,
}
