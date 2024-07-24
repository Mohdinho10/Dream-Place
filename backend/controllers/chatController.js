import asyncHandler from "../middleware/asyncHandler.js";
import prisma from "../utils/prisma.js";

export const getChats = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;

  const chats = await prisma.chat.findMany({
    where: {
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
  });

  for (const chat of chats) {
    const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });
    chat.receiver = receiver;
  }

  res.status(200).json(chats);
});

export const getChat = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;

  const chat = await prisma.chat.findUnique({
    where: {
      id: req.params.id,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  await prisma.chat.update({
    where: {
      id: req.params.id,
    },
    data: {
      seenBy: {
        push: [tokenUserId],
      },
    },
  });

  if (!chat) throw new Error("No Chat found!");

  res.status(200).json(chat);
});

export const addChat = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;

  const newChat = await prisma.chat.create({
    data: {
      userIDs: [tokenUserId, req.body.receiverId],
    },
  });
  res.status(200).json(newChat);
});

export const readChat = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;
  console.log(tokenUserId);
  console.log(req.params.id);

  const chat = await prisma.chat.update({
    where: {
      id: req.params.id,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
    data: {
      seenBy: {
        set: [tokenUserId],
      },
    },
  });

  if (!chat) throw new Error("No Chat found!");

  res.status(200).json(chat);
});

export const addMessage = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
  });

  if (!chat) throw new Error("No Chat found!");

  const message = await prisma.message.create({
    data: {
      text,
      chatId,
      userId: tokenUserId,
    },
  });

  await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      seenBy: [tokenUserId],
      lastMessage: text,
    },
  });

  res.status(200).json(message);
});
