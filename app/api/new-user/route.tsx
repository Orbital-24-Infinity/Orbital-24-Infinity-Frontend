import crypto from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

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

export const getDateNow = (offset?: number): Date => {
  const date = new Date();
  if (offset) {
    date.setDate(date.getDate() + offset);
  }
  return date;
};

export async function POST(request: Request) {
  const res = await request.json();
  const newUser = await checkNewUser(res.email);
  const newAuthKey = crypto.randomBytes(64).toString("hex");
  let result = {};
  if (newUser) {
    result = await prisma.user.create({
      data: {
        email: res.user.email,
        lastLogin: getDateNow(),
        authKey: newAuthKey,
        authValidity: getDateNow(AUTH_VALIDITY_IN_DAYS),
      },
    });
  } else {
    result = await prisma.user.update({
      where: {
        email: res.user.email,
      },
      data: {
        lastLogin: getDateNow(),
        authKey: newAuthKey,
        authValidity: getDateNow(AUTH_VALIDITY_IN_DAYS),
      },
    });
  }
  cookies().set("authKey", newAuthKey);
  return NextResponse.json(result);
}
