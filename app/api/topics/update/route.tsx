import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";
import { getDateNow } from "../../login/date";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  const lastModified = getDateNow();
  const userEmail: string = await req?.user?.email;
  const validReq = await checkValidRequest(userEmail);

  let result = {
    data: {
      id: undefined,
      title: req.topic?.topicName ?? undefined,
      maxQuestions: undefined,
      files: undefined,
      questions: undefined,
      user: undefined,
      userID: undefined,
      lastModified: lastModified,
      isGenerating: req.topic?.isGenerating ?? undefined,
      data: req.topic?.data ?? undefined,
    },
    success: false,
    ...request,
  };

  try {
    if (userEmail && validReq) {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      const updateRes = await prisma.topic
        .update({
          data: result.data,
          where: {
            userID: user!.id,
            id: req.topic.topicID,
          },
        })
        .then((res) => {
          result.success = true;
        })
        .catch((err) => {
          result.success = false;
        });

      if (req.topic.fileData) {
        req.topic.fileData.forEach(async (eachFile: any, index: number) => {
          if (index < req.topic.fileIDs.length) {
            await prisma.file.update({
              data: {
                id: undefined,
                topicID: undefined,
                data: eachFile,
                name: req.topic.fileName[index],
              },
              where: {
                id: req.topic.fileIDs[index],
              },
            });
          } else {
            await prisma.file.create({
              data: {
                topicID: req.topic.topicID,
                data: eachFile,
                name: req.topic.fileName[index],
              },
            });
          }
        });
        if (req.topic.filesToDelete) {
          req.topic.filesToDelete.forEach(async (fileID: number) => {
            await prisma.file.delete({
              where: {
                id: fileID,
              },
            });
          });
        }
      }
    }
  } catch {
    return NextResponse.json(result);
  }
  return NextResponse.json(result);
}
