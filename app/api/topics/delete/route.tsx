import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";

export const maxDuration = 60;
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
    const questionsOptionsRequest: Promise<any>[] = [];
    const questionsRequest: Promise<any>[] = [];
    questions.map(async (each) => {
      questionsOptionsRequest.push(
        new Promise((resolve, reject) => {
          const res = prisma.questionOptions.deleteMany({
            where: {
              questionID: each.id,
            },
          });
          resolve(res);
        })
      );
      questionsRequest.push(
        new Promise((resolve, reject) => {
          const res = prisma.question.delete({
            where: {
              id: each.id,
            },
          });
          resolve(res);
        })
      );
    });
    await Promise.all(questionsOptionsRequest);
    await Promise.all(questionsRequest);
    await prisma.file.deleteMany({
      where: {
        topicID: req.topic.topicID,
      },
    });
    result = await prisma.topic.delete({
      where: {
        id: req.topic.topicID,
        userID: user!.id,
      },
    });
  }
  return NextResponse.json(result);
}
