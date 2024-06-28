import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request) {
  const req = await request.json();
  let result = {};
  if (await checkValidRequest(req.user.email)) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
      },
    });
    const topicToDelete = await prisma.topic.findFirst({
      where: {
        id: req.topic.topicID,
        userID: user!.id,
      },
    });
    const questions = await prisma.question.findMany({
      where: {
        topicID: topicToDelete!.id,
      },
    });
    await Promise.all(
      questions.map(async (each) => {
        await prisma.questionOptions.deleteMany({
          where: {
            questionID: each.id,
          },
        });
        await prisma.question.delete({
          where: {
            id: each.id,
          },
        });
      })
    );
    result = await prisma.topic.delete({
      where: {
        id: req.topic.topicID,
        userID: user!.id,
      },
    });
  }
  return NextResponse.json(result);
}
