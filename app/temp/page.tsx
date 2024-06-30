"use client";
import { useEffect, useState } from "react";

const Temp = () => {
  useEffect(() => {
    const f = async () => {
      try {
        await fetch("/api/temp", {
          method: "GET",
        }).then(async (res: any) => {
          console.log(await res.json());
        });

        await fetch("/api/temp", {
          method: "POST",
          body: JSON.stringify({}),
        }).then(async (res: any) => {
          console.log(await res.json());
        });
      } catch (e) {
        console.log(e);
      }
    };

    f();
  });
  return <></>;
};

export default Temp;
