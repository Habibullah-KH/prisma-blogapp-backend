import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async(req: Request, res: Response) => {
    try{
        const result = await PostService.createPost(req.body)
        res.status(201).json({
            success: true,
            message: "Data insert successfully !!",
            data: result
        })
    } catch (error: any){
        res.status(404).json({
            success: false,
            message: error.message,
            details: error
            
        })
    }
}

export const PostControler = {
    createPost
}