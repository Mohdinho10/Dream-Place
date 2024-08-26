import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Checking if user exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  res.status(201).json({ message: "User created successfully", newUser });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password", 401);
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // console.log(user);

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const age = 1000 * 60 * 60 * 24 * 30;
  // maxAge: 30 * 24 * 60 * 60 * 1000,

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: age,
  });

  const { password: userPassword, ...userInfo } = user;

  //   Generate Cookie token
  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: age, // 1 week
    })
    .status(200)
    .json(userInfo);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt").status(200).json({ message: "Logout Successfully" });
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();

  if (!users) throw new Error("No User found!");

  res.status(200).json(users);
});

export const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) throw new Error("No User found!");

  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;

  if (password) {
    updatedPassword = await bcrypt.hash(password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...inputs,
      ...(updatedPassword && { password: updatedPassword }),
      ...(avatar && { avatar }),
    },
  });

  const { password: userPassword, ...rest } = updatedUser;

  res.status(200).json(rest);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  await prisma.user.delete({
    where: { id },
  });
  res.status(200).json({ message: "User deleted" });
});

export const getNotifications = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;

  const number = await prisma.chat.count({
    where: {
      userIDs: {
        hasSome: [tokenUserId],
      },
      NOT: {
        seenBy: {
          hasSome: [tokenUserId],
        },
      },
    },
  });
  res.status(200).json(number);
});
