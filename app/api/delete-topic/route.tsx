import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../authentication/route";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request) {
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
    result = await prisma.topic.delete({
      where: {
        id: res.topic.topicID,
        userID: user!.id,
      },
    });
    // TODO: Delete all questions associated with this topic
  }
  return NextResponse.json(result);
}
