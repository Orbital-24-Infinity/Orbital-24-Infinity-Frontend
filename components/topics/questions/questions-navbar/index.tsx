"use client";

import { Prisma } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import PopupDetails from "@/components/dashboard/new-topic/popup-details";
import Icon, { Icons } from "@/components/icons";

import styles from "./QuestionsNavbar.module.sass";

interface QuestionNavbarProps {
  data: string;
  title: string;
  topicID: number;
  fetchData: () => void;
  linkedFiles: Prisma.FileUncheckedCreateInput[];
  handleTitleChange: (title: string) => void;
}

const QuestionNavbar = ({
  data,
  title,
  topicID,
  fetchData,
  linkedFiles,
  handleTitleChange,
}: QuestionNavbarProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  useEffect(() => {
    const handleUpdatedTitle = async () => {
      if (user && currentTitle) {
        await fetch("/api/topics/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
            topic: { topicID: topicID, topicName: currentTitle },
          }),
        });
      }
    };

    const timeoutHandle = setTimeout(() => {
      handleUpdatedTitle();
    }, 1500);

    if (currentTitle && title !== currentTitle) {
      handleTitleChange(currentTitle);
    }

    return () => clearTimeout(timeoutHandle);
  }, [currentTitle, topicID, user, handleTitleChange, title]);

  return (
    <div className={styles.questionNavbar}>
      <Link href="/dashboard">
        <Icon
          type={Icons.Back}
          width="auto"
          viewBox="0 -960 640 960"
          style={{ padding: "14px 16px", scale: "0.8" }}
          hoverEffects
        />
      </Link>

      <input
        type="text"
        className={styles.questionTitle}
        value={currentTitle}
        onChange={(e) => {
          if (e.target.value) {
            setCurrentTitle(e.target.value);
          }
        }}
      />

      <div className={styles.questionNavbarRight}>
        {/* Add more icon functions here as needed */}
        <Icon
          type={Icons.Edit}
          hoverEffects
          style={{ padding: "10px", margin: "auto" }}
          onClick={() => {
            setIsEditMenuOpen(true);
          }}
        />
      </div>

      {isEditMenuOpen && (
        <PopupDetails
          handleFetchTopics={fetchData}
          data={data}
          title={title}
          setIsNewTopicDetailsOpen={setIsEditMenuOpen}
          updateDataInstead
          topicID={topicID}
          fileIDs={linkedFiles ? linkedFiles.map((each) => each.id!) : []}
          fileNames={linkedFiles ? linkedFiles.map((each) => each.name!) : []}
          filesTexts={linkedFiles ? linkedFiles.map((each) => each.data!) : []}
        />
      )}
    </div>
  );
};

export default QuestionNavbar;
