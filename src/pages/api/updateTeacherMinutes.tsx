import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, invijilationMinutes } = JSON.parse(req.body);

  const updateTeacher = await prisma.teacher.update({
    where: {
      id: id,
    },
    data: {
      invijilationMinutes: invijilationMinutes,
    },
  });

  res.json(updateTeacher);
};
