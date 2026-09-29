import { SortOrder } from "./../../../generated/prisma/internal/prismaNamespaceBrowser";
import { Request, Response } from "express";
import { PostService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helper/paginationSortingHelper";
import { UserRole } from "../../middleWares/auth";

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        success: false,
        error: "unauthorized",
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

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const searchString = typeof search === "string" ? search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // const isFeatured = req.query.isFeatured ? req.query.isFeatured === 'true' : undefined

    // true or false
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

    // const page = Number(req.query.page ?? 1);

    // const limit = Number(req.query.limit ?? 10);

    // const skip = (page - 1) * limit;

    // const sortBy = req.query.sortBy as string | undefined;

    // const sortOrder = req.query.sortOrder as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );

    console.log(page, limit, skip, sortBy, sortOrder);

    const result = await PostService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      success: true,
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

const getPostById = async (req: Request, res: Response) => {
  try {
    const {postId} = req.params;
    if(!postId){
      throw new Error("Post Id is required!")
    }
    const result = await PostService.getPostById(postId as string);
    res.status(200).json(result)
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getMyPost = async (req: Request, res: Response) => {
  try {

    const user = req.user;
    if(!user){
      throw new Error("you are unauthorized !!")
    }
    console.log(user);
    const result = await PostService.getMyPost(user?.id as string);
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

// 1. user can only update own post but can't update isFeatured
//2. Admin can update everyone post

const updatePost = async (req: Request, res: Response) => {
  try {

    const user = req.user;
    if(!user){
      throw new Error("you are unauthorized !!")
    }

    const {postId} = req.params;

    const isAdmin = user.role === UserRole.ADMIN
    console.log(user);
    const result = await PostService.updatePost(postId as string, req.body, user?.id as string, isAdmin);
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

const deltePost = async (req: Request, res: Response) => {
  try {

    const user = req.user;
    if(!user){
      throw new Error("you are unauthorized !!")
    }

    const {postId} = req.params;

    const isAdmin = user.role === UserRole.ADMIN
    console.log(user);
    const result = await PostService.deltePost(postId as string, user?.id as string, isAdmin);
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

const getStatistics = async (req: Request, res: Response) => {
  try {

    const result = await PostService.getStatistics();
    res.status(201).json({
      success: true,
      message: "statistics get successfully !!",
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

export const PostControler = {
  createPost,
  getAllPost,
  getPostById,
  getMyPost,
  updatePost,
  deltePost,
  getStatistics
};
