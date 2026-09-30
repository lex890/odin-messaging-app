import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const getMessages = async (req: Request, res: Response) => {
  const convoId = Number(req.params.id);

  if (Number.isNaN(convoId)) {
    return res.status(400).json({ message: "Invalid convo id" });
  }

  const participant = await prisma.convoParticipant.findUnique({
    where: { userId_convoId: { userId: req.userId as number, convoId } },
  });

  if (!participant) {
    return res.status(403).json({ message: "Not a participant in this convo" });
  }

  const messages = await prisma.message.findMany({
    where: { convoId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: { id: true, firstName: true, lastName: true, nickName: true, avatarUrl: true },
      },
    },
  });

  return res.json(messages);
};

export const createMessage = async (req: Request, res: Response) => {
  const convoId = Number(req.params.id);
  const { content } = req.body;

  if (Number.isNaN(convoId)) {
    return res.status(400).json({ message: "Invalid convo id" });
  }

  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ message: "Message content is required" });
  }

  const participant = await prisma.convoParticipant.findUnique({
    where: { userId_convoId: { userId: req.userId as number, convoId } },
  });

  if (!participant) {
    return res.status(403).json({ message: "Not a participant in this convo" });
  }

  const message = await prisma.message.create({
    data: {
      content: content.trim(),
      convoId,
      senderId: req.userId as number,
    },
    include: {
      sender: {
        select: { id: true, firstName: true, lastName: true, nickName: true, avatarUrl: true },
      },
    },
  });

  // Bump the convo so the sidebar sorts by latest activity
  await prisma.convo.update({
    where: { id: convoId },
    data: { updatedAt: new Date() },
  });

  return res.status(201).json(message);
};