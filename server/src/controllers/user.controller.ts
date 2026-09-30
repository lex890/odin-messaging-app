import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      nickName: true,
      bio: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      nickName: true,
      bio: true,
      avatarUrl: true,
      // no email, no passwordHash — this is someone else's public profile
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  const { nickName, bio, avatarUrl } = req.body;

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { nickName, bio, avatarUrl },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      nickName: true,
      bio: true,
      avatarUrl: true,
    },
  });

  return res.json(user);
};