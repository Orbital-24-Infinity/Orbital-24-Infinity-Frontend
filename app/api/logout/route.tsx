import crypto from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";

import { getDateNow } from "../login/date";

const dynamic = "force-dynamic";
export const AUTH_VALIDITY_IN_DAYS = 1;

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
  try {
    const token = await auth.verifyIdToken(req.idToken);
    if (!token) {
      return NextResponse.json({
        ...req,
        statusCode: statusCode,
      });
    }

    const userExists = await checkUserExists(req.email);
    newAuthValidity = getDateNow();
    const data = {
      lastLogin: getDateNow(),
      authKey: newAuthKey,
      authValidity: newAuthValidity,
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
