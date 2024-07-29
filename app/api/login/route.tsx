import crypto from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";

import { AUTH_VALIDITY_IN_DAYS } from "../constants";
import { getDateNow } from "./date";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const checkNewUser = async (email: string): Promise<boolean> => {
  const res = await prisma.user.findFirst({
    select: {
      email: true,
    },
    where: {
      email: email,
    },
  });
  return !res;
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
    const newUser = await checkNewUser(req.user.email);
    newAuthKey = crypto.randomBytes(64).toString("hex");
    newAuthValidity = getDateNow(AUTH_VALIDITY_IN_DAYS);
    const data = {
      id: undefined,
      email: undefined,
      lastLogin: getDateNow(),
      authKey: newAuthKey,
      authValidity: newAuthValidity,
      posts: undefined,
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
