import crypto from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";

import { getDateNow } from "./date";

const dynamic = "force-dynamic";
export const AUTH_VALIDITY_IN_DAYS = 1;

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
  const req = await request.json();
  let result = {};
  let newAuthKey = "";
  let newAuthValidity = getDateNow();
  let statusCode = 401;
  try {
    const token = await auth.verifyIdToken(req._tokenResponse.idToken);
    if (!token) {
      return NextResponse.json({
        ...req,
        statusCode: statusCode,
        customAuthKey: newAuthKey,
        customAuthValidity: newAuthValidity,
      });
    }

    const newUser = await checkNewUser(req.email);
    newAuthKey = crypto.randomBytes(64).toString("hex");
    newAuthValidity = getDateNow(AUTH_VALIDITY_IN_DAYS);
    const data = {
      lastLogin: getDateNow(),
      authKey: newAuthKey,
      authValidity: newAuthValidity,
    };

    if (newUser) {
      result = await prisma.user.create({
        data: {
          ...data,
          email: req.user.email,
        },
      });
    } else {
      result = await prisma.user.update({
        where: {
          email: req.user.email,
        },
        data: data,
      });
    }
    statusCode = 200;
    cookies().set(
      "session",
      JSON.stringify({
        idToken: req._tokenResponse.idToken,
        customAuthKey: newAuthKey,
        customAuthValidity: newAuthValidity,
      }),
      {
        expires: newAuthValidity,
        httpOnly: true,
      }
    );
  } catch (error) {}
  return NextResponse.json({
    ...req,
    statusCode: statusCode,
    customAuthKey: newAuthKey,
    customAuthValidity: newAuthValidity,
  });
}
