"use client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";

import styles from "../Actions.module.sass";
import generateStyles from "./Generate.module.sass";

interface IGenerateButton {
  id: number;
  handleFetchTopics: () => any;
}

const GenerateButton = ({ id, handleFetchTopics }: IGenerateButton) => {
  const [user, loading, error] = useAuthState(auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = async (e: any, id: number) => {
    if (!isGenerating) {
      setIsGenerating(true);
      const bodyToSend = JSON.stringify({
        user: user,
        data: {
          title: "placeholder",
          passage: "placeholder",
          id: id,
        },
        topic: {
          isGenerating: false,
          topicID: id,
        },
      });

      await fetch("/api/topics/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          topic: {
            topicID: id,
            isGenerating: true,
          },
        }),
      }).then(async (res: any) => {
        res = await res.json();
        if (res.success) {
          handleFetchTopics();
          await fetch("/api/questions/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: bodyToSend,
          }).then(async (res) => {
            handleFetchTopics();
            setIsGenerating(false);
          });
        }
      });
    }
  };

  return (
    <button
      onClick={(e) => handleClick(e, id)}
      className={`${styles.actionButtons} ${generateStyles.generateButton}`}
      disabled={isGenerating}
    >
      Generate More
    </button>
  );
};

export default GenerateButton;
