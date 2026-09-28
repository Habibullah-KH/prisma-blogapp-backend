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

export const CommentControler = {
    createComment
}
