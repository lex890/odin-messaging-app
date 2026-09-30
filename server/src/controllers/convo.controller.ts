import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const getConvos = async (req: Request, res: Response) => {
  const convos = await prisma.convo.findMany({
    where: {
      participants: {
        some: { userId: req.userId },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, nickName: true, avatarUrl: true },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return res.json(convos);
};

export const createConvo = async (req: Request, res: Response) => {
  const { userId: otherUserId } = req.body;

  if (!otherUserId) {
    return res.status(400).json({ message: "otherUserId is required" });
  }

  // Look for an existing 2-person convo between these two users
  const existing = await prisma.convo.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: req.userId } } },
        { participants: { some: { userId: otherUserId } } },
      ],
    },
    include: { participants: true },
  });

  const isExactlyTwo = existing?.participants.length === 2;

  if (existing && isExactlyTwo) {
    return res.json(existing);
  }

  const convo = await prisma.convo.create({
    data: {
      participants: {
        create: [{ userId: req.userId as number }, { userId: otherUserId }],
      },
    },
    include: { participants: true },
  });

  return res.status(201).json(convo);
};

export const getConvoById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid convo id" });
  }

  const convo = await prisma.convo.findUnique({
    where: { id },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, nickName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  if (!convo) {
    return res.status(404).json({ message: "Convo not found" });
  }

  const isParticipant = convo.participants.some((p) => p.userId === req.userId);

  if (!isParticipant) {
    return res.status(403).json({ message: "Not a participant in this convo" });
  }

  return res.json(convo);
};