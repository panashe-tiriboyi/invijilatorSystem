import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, subjectId } = JSON.parse(req.body);
  console.log("id from frontend", subjectId);

  let list = await prisma.teacher.findUnique({
    where: { id: id },
    select: { subjects: true },
  });

  const listArr = list.subjects;
  let listObj = [{ id: subjectId }];

  let createObj = (propValue) => {
    return { id: propValue };
  };

  for (let i = 0; i < listArr.length; i++) {
    let obj = createObj(listArr[i].id);
    listObj.push(obj);
  }

  console.log("list", listArr);
  console.log("listObj", listObj);

  //   const listItem = listArr.map((item)=>)

  const updateTeacher = await prisma.teacher.update({
    where: {
      id: id,
    },
    data: {
      subjects: { set: listObj },
    },
  });

  res.json(updateTeacher);
};
