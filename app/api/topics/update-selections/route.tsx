import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const req = await request.json();
  const userEmail: string = await req?.user?.email;
  const validReq = await checkValidRequest(userEmail);

  let result = {
    success: false,
  };

  try {
    if (userEmail && validReq) {
      await prisma.question
        .update({
          where: {
            id: req.question?.id,
            topicID: req.topic?.topicID,
          },
          data: {
            id: undefined,
            question: undefined,
            mrq: undefined,
            openEnded: undefined,
            marked: req.question?.marked || undefined,
            selected: req.question?.selected || undefined,
            options: undefined,
            topicID: undefined,
            topic: undefined,
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
