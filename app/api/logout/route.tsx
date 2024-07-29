import crypto from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";

import { getDateNow } from "../login/date";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const checkUserExists = async (email: string): Promise<boolean> => {
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
  const req = await request.json();
  let result = {};
  let newAuthKey = "";
  let newAuthValidity = getDateNow();
  let statusCode = 401;
  const session: any = JSON.parse(cookies().get("session")?.value!);
  try {
    const token = await auth.verifyIdToken(session!["idToken"]);
    if (!token) {
      return NextResponse.json({
        ...req,
        statusCode: statusCode,
      });
    }

    const userExists = await checkUserExists(req.email);
    const data = {
      id: undefined,
      email: undefined,
      lastLogin: undefined,
      authKey: newAuthKey,
      authValidity: newAuthValidity,
      posts: undefined,
    };

    if (userExists) {
      result = await prisma.user.update({
        where: {
          email: req.user.email,
        },
        data: data,
      });
    }
    statusCode = 200;

    cookies().delete("session");
  } catch (error) {}
  return NextResponse.json({
    ...req,
    statusCode: statusCode,
  });
}
