import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const req = await request.json();
  let result = {};
  console.log("fetching");
  await fetch(`http://${process.env.BACKEND_DJANGO_HOST}/`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Request-Methods": "GET",
      "Access-Control-Request-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Access-Control-Allow-Origin": "*",
    },
    // body: JSON.stringify({}),
  }).then(async (res: any) => {
    // const out = await res.json();
    console.log(res);
    result = res;
  });
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const req = await request.json();
  let result = {};

  await fetch(`http://${process.env.BACKEND_DJANGO_HOST}/`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Request-Methods": "POST",
    //   "Access-Control-Request-Headers":
    //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //   "Access-Control-Allow-Origin": "*",
    // },
    headers: {
      "Content-Type": "application/json",
    },
    // mode: "cors",
    body: JSON.stringify({
      quizName: "testing123",
      passage:
        "Object-oriented programming (OOP) is a programming paradigm based on the concept of 'objects,' which can contain data in the form of fields, often known as attributes or properties, and code in the form of procedures, often known as methods. OOP aims to structure code in a way that mirrors real-world objects, making it easier to understand, maintain, and reuse. In OOP, objects are instances of classes, which serve as blueprints for creating objects. Classes define the properties and behaviors of objects. Encapsulation is a key principle of OOP, which involves bundling data and methods that operate on that data within a single unit or class. This helps in hiding the internal state of an object and only allowing access through well-defined interfaces. Another important concept in OOP is inheritance, which allows a class to inherit properties and methods from another class, known as a superclass or base class. This promotes code reuse and allows for the creation of hierarchical relationships between classes. Polymorphism is also fundamental to OOP, enabling objects of different classes to be treated as objects of a common superclass. This allows for flexibility in programming and simplifies code maintenance and extension. Abstraction is the process of simplifying complex systems by modeling classes appropriate to the problem while hiding unnecessary details. It helps in managing complexity by providing a clear separation between the implementation of a class and its interface",
    }),
  }).then(async (res: any) => {
    // const out = await res.json();
    console.log(res);
  });
  return NextResponse.json(result);
}
