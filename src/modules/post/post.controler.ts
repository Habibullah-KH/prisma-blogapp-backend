import { Request, Response } from "express";
import { PostService } from "./post.service";

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

    const search = req.query

    console.log("search value", search);

    const result = await PostService.getAllPost({search})
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
