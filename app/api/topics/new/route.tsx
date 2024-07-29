import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const req = await request.json();
  let result: any = {};
  if (await checkValidRequest(req.user.email)) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
      },
    });
    result = await prisma.topic.create({
      data: {
        title: req.topic.title,
        maxQuestions: 0,
        userID: user!.id,
        data: req.topic.data,
        isGenerating: true,
      },
    });
    if (req.topic.fileData) {
      req.topic.fileData.forEach(async (eachFile: any, index: number) => {
        await prisma.file.create({
          data: {
            topicID: result.id,
            data: eachFile,
            name: req.topic.fileName[index],
          },
        });
      });
    }
    // console.log("RESULT", result);
  }
  return NextResponse.json(result);
}
