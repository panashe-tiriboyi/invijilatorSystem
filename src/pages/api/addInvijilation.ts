import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const invijilatonData = JSON.parse(req.body);
  console.log(invijilatonData);

  const savedInvijilation = await prisma.invijilation.create({
    data: invijilatonData,
  });

  res.json(invijilatonData);
};
