/*





THIS ROUTE IS ONLY USED FOR DEV PURPOSES TO ADD TEST QUESTIONS. IN PRODUCTION, THE BACKEND WILL HANDLE THIS





*/

import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function makeRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789  ";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export async function POST(request: Request) {
  const req = await request.json();
  const randomString = makeRandomString(Math.random() * 50 + 30);
  let result = {};
  await prisma.question.create({
    data: {
      question: randomString,
      topicID: req.topicID,
    },
  });
  const question = await prisma.question.findFirst({
    where: {
      question: randomString,
      topicID: req.topicID,
    },
  });
  for (let i = 0; i < 4; i++) {
    const randomOption = makeRandomString(Math.random() * 15 + 5);
    await prisma.questionOptions.create({
      data: {
        option: `Option ${randomOption}`,
        correct: i === 0,
        questionID: question!.id,
      },
    });
  }
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const req = await request.json();
  let result = {};
  const question = await prisma.question.findFirst({
    where: {
      question: req.question,
      topicID: req.topicID,
    },
  });
  if (question) {
    await prisma.questionOptions.deleteMany({
      where: {
        questionID: question!.id,
      },
    });
    await prisma.question.delete({
      where: {
        id: question!.id,
      },
    });
  }
  return NextResponse.json(result);
}
