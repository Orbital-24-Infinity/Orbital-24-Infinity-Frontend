import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../authentication/route";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const res = await request.json();
  let result = {};
  if (await checkValidRequest(res.user.email)) {
    const user = await prisma.user.findUnique({
      where: {
        email: res.user.email,
      },
      select: {
        id: true,
      },
    });
    result = await prisma.topic.create({
      data: {
        title: res.topic.title,
        maxQuestions: 10,
        userID: user!.id,
        data: res.topic.data,
      },
    });
  }
  return NextResponse.json(result);
}
