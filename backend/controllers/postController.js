import asyncHandler from "../middleware/asyncHandler.js";
import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = asyncHandler(async (req, res) => {
  // const tokenUserId = req.userId;

  const query = req.query;

  const posts = await prisma.post.findMany({
    where: {
      city: query.city || undefined,
      type: query.type || undefined,
      property: query.property || undefined,
      bedroom: parseInt(query.bedroom) || undefined,
      price: {
        gte: parseInt(query.minPrice) || undefined,
        lte: parseInt(query.maxPrice) || undefined,
      },
      // NOT: {
      //   userId: tokenUserId, // Exclude posts created by the logged-in user
      // },
    },
  });

  if (!posts) throw new Error("No Post found!");

  // setTimeout(() => {
  res.status(200).json(posts);
  // }, 3000);
});

export const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      postDetail: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  if (!post) throw new Error("No Post found!");

  const token = req.cookies?.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (!err) {
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });
        res.status(200).json({ ...post, isSaved: saved ? true : false });
      }
    });
  } else {
    res.status(200).json({ ...post, isSaved: false });
  }
});

export const addPost = asyncHandler(async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  const newPost = await prisma.post.create({
    data: {
      ...body.postData,
      userId: tokenUserId,
      postDetail: {
        create: body.postDetail,
      },
    },
  });

  console.log(newPost);

  res.status(200).json(newPost);
});

export const updatePost = asyncHandler(async (req, res) => {});

export const deletePost = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (post.userId !== tokenUserId) {
    throw new Error("Unauthorized to delete this post");
  }

  await prisma.post.delete({
    where: { id },
  });

  res.status(200).json({ message: "Post deleted" });
});

export const savePost = asyncHandler(async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  const savedPost = await prisma.savedPost.findUnique({
    where: {
      userId_postId: {
        userId: tokenUserId,
        postId,
      },
    },
  });

  if (savedPost) {
    await prisma.savedPost.delete({
      where: {
        id: savedPost.id,
      },
    });
    res.status(200).json({ message: "Post removed from saved list" });
  } else {
    await prisma.savedPost.create({
      data: {
        userId: tokenUserId,
        postId,
      },
    });
    res.status(200).json({ message: "Post saved" });
  }
});

export const getProfilePost = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;

  const userPosts = await prisma.post.findMany({
    where: { userId: tokenUserId },
  });

  const saved = await prisma.savedPost.findMany({
    where: { userId: tokenUserId },
    include: {
      post: true,
    },
  });

  const savedPosts = saved.map((item) => item.post);

  res.status(200).json({ userPosts, savedPosts });
});
