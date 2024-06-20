import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { ITopic, TopicStatus } from "@/components/dashboard/topic/constants";
import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";
import { getDateNow } from "../../login/date";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const req = await request.json();
  const userEmail: string = await req?.user.email;
  const validReq = await checkValidRequest(userEmail);
  const lastModified = getDateNow();
  let result = {
    ...request,
    success: false,
    lastModified: lastModified,
  };
  try {
    if (userEmail && validReq) {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (req.topicName == "") {
        req.topic.topicName = undefined;
      }

      await prisma.topic
        .update({
          data: {
            id: undefined,
            title: req.topic.topicName || undefined,
            maxQuestions: undefined,
            files: undefined,
            questions: undefined,
            user: undefined,
            userID: undefined,
            lastModified: lastModified,
            data: undefined,
          },
          where: {
            userID: user!.id,
            id: req.topic.topicID,
          },
        })
        .then((res) => {
          result.success = true;
        })
        .catch((err) => {
          result.success = false;
        });
    }
  } catch {
    return NextResponse.json(result);
  }
  return NextResponse.json(result);
}
