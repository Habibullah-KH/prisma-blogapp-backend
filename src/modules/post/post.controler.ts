import { Request, Response } from "express";
import { PostService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        success: false,
        error: "unauthorized"
      });
    }
    const result = await PostService.createPost(req.body, req.user.id);
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


const getAllPost = async(req: Request, res: Response)=>{
  try{

    const {search} = req.query

    const searchString = typeof search === "string" ? search : undefined

    const tags = req.query.tags ? (req.query.tags as string).split(",") : []

    // const isFeatured = req.query.isFeatured ? req.query.isFeatured === 'true' : undefined

    // true or false
    const isFeatured = req.query.isFeatured 
    ? req.query.isFeatured === 'true' 
      ? true
      : req.query.isFeatured === 'false' 
      ? false
      : undefined
    : undefined

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

    const result = await PostService.getAllPost({search: searchString, tags, isFeatured, status, authorId})


    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
}
export const PostControler = {
  createPost,
  getAllPost
};
