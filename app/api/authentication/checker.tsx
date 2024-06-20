import { cookies } from "next/headers";

import { auth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";

import { AUTH_VALIDITY_IN_DAYS } from "../constants";
import { getDateNow } from "../login/date";

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
