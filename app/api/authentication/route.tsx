import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";

import { AUTH_VALIDITY_IN_DAYS, getDateNow } from "../login/route";

const dynamic = "force-dynamic";

interface CheckValidRequestResponse {
  valid: boolean;
}

export const checkValidRequest = async (email: string): Promise<boolean> => {
  try {
    const session: any = JSON.parse(cookies().get("session")?.value!);
    const token = await auth.verifyIdToken(session.idToken);
    if (!token) {
      return false;
    }
    const res = await prisma.user.findMany({
      where: {
        email: email,
        authKey: session!["newAuthKey"],
        authValidity: {
          gte: getDateNow(),
        },
      },
    });
    if (res.length === 1) {
      await prisma.user.update({
        where: {
          id: res[0].id,
          email: email,
        },
        data: {
          authValidity: getDateNow(AUTH_VALIDITY_IN_DAYS),
        },
      });
    }
    return res.length === 1;
  } catch (error) {
    return false;
  }
};

export async function POST(
  request: Request
): Promise<NextResponse<CheckValidRequestResponse>> {
  const res = await request.json();
  const result: CheckValidRequestResponse = {
    valid: await checkValidRequest(res.email),
  };
  return NextResponse.json(result);
}
