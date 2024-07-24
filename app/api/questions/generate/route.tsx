import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { checkValidRequest } from "../../authentication/checker";
import { getDateNow } from "../../login/date";

// export async function GET(request: Request) {
//   const req = await request.json();
//   let result = {};
//   if (await checkValidRequest(req.user.email)) {
//     await fetch(`http://${process.env.BACKEND_DJANGO_HOST}/`, {
//       method: "GET",
//     }).then(async (res: any) => {
//       result = await res.json();
//     });
//   }
//   return NextResponse.json(result);
// }

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  let result = {};
  if (
    (await checkValidRequest(req.user.email)) &&
    req.data?.title &&
    req.data?.passage
  ) {
    try {
      const rawData = {
        quizName: req.data.title,
        passage: req.data?.passage,
      };

      await fetch(
        `http://${process.env.BACKEND_DJANGO_HOST}/quizzes/generate/${req.topic.topicID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Accept: "*/*",
            // "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify(rawData),
        }
      ).then(async (res: any) => {
        // console.log(res);
        result = await res.json();
        // console.log(result);

        // await fetch(
        //   `http://${process.env.BACKEND_DJANGO_HOST}/quizzes/questions/${req.topic.topicID}`,
        //   {
        //     method: "GET",
        //   }
        // ).then(async (res: any) => {
        //   console.log(res);
        //   result = await res.json();
        //   console.log(result);
        // });

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: req.user.email,
        //   },
        // });

        // await prisma.topic.update({
        //   data: {
        //     id: undefined,
        //     title: undefined,
        //     maxQuestions: await prisma.question.count({
        //       where: {
        //         topicID: req.topic.topicID,
        //       },
        //     }),
        //     files: undefined,
        //     questions: undefined,
        //     user: undefined,
        //     userID: undefined,
        //     lastModified: getDateNow(),
        //     isGenerating: false,
        //     data: undefined,
        //   },
        //   where: {
        //     userID: user!.id,
        //     id: req.topic.topicID,
        //   },
        // });
      });
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.json(result);
}
