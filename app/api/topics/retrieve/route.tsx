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
  let result: any[] = [];
  if (userEmail && validReq) {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    result = await prisma.topic.findMany({
      where: {
        userID: user!.id,
      },
    });
  }
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
      };
    }
  );
  return NextResponse.json(processedResult);
}
