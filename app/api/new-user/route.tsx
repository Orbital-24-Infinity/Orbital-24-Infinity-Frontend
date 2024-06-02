import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

const checkNewUser = async (email: string): Promise<boolean> => {
  return (
    (
      await prisma.user.findMany({
        select: {
          email: true,
        },
        where: {
          email: email,
        },
      })
    ).length === 0
  );
};

export async function POST(request: Request) {
  const res = await request.json();
  const newUser = await checkNewUser(res.email);
  let result = {};
  if (newUser) {
    result = await prisma.user.create({
      data: {
        email: res.user.email,
      },
    });
  }
  return NextResponse.json(result);
}
