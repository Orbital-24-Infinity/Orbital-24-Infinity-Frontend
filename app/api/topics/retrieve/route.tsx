import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { ITopic, TopicStatus } from "@/components/dashboard/topic/constants";
import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const req = await request.json();
  const userEmail: string = await req?.user.email;
  const validReq = await checkValidRequest(userEmail);
  const findSingle = req.single ? req.single : false;
  let result: any[] = [];
  if (userEmail && validReq) {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    console.log({
      userID: user!.id,
      id: req.topicID ? req.topicID : -1,
    });
    if (findSingle) {
      const output = await prisma.topic.findFirst({
        where: {
          userID: user!.id,
          id: req.topicID ? req.topicID : -1,
        },
      });
      if (output != null) {
        result = [output];
      }
    } else {
      result = await prisma.topic.findMany({
        where: {
          userID: user!.id,
        },
      });
    }
  }
  console.log(result);
  const status = await Promise.all(
    result.map((each) =>
      prisma.question.findMany({ where: { topicID: each.id } })
    )
  );
  const processedResult: ITopic[] = result.map(
    (topic: Prisma.TopicUncheckedCreateInput, index: number): ITopic => {
      return {
        topicID: topic.id!,
        topicName: topic.title,
        lastModified: !topic.lastModified
          ? new Date(0)
          : typeof topic.lastModified! === "string"
            ? new Date(topic.lastModified)
            : topic.lastModified!,
        status:
          status[index].length === 0
            ? TopicStatus.GENERATING
            : status[index].length === topic.maxQuestions
              ? TopicStatus.COMPLETED
              : TopicStatus.ATTEMPTING,
        questionsAttempted: status[index].reduce(
          (counter, each) => (each.selected !== -1 ? counter : counter + 1),
          0
        ),
        questionsTotal: topic.maxQuestions!,
        data: topic.data,
      };
    }
  );
  return NextResponse.json(processedResult);
}
