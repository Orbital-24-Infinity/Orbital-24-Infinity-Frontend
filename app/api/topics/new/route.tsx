import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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
    result = await prisma.topic.create({
      data: {
        title: req.topic.title,
        maxQuestions: 10,
        userID: user!.id,
        data: req.topic.data,
        isGenerating: true,
      },
    });
    // console.log(result);
  }
  return NextResponse.json(result);
}
