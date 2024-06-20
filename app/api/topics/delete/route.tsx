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
    result = await prisma.topic.delete({
      where: {
        id: req.topic.topicID,
        userID: user!.id,
      },
    });
    // TODO: Delete all questions associated with this topic
  }
  return NextResponse.json(result);
}
