"use client";
import Link from "next/link";
import { useState } from "react";

import PopupDetails from "@/components/dashboard/new-topic/popup-details";
import Icon, { Icons } from "@/components/icons";

import styles from "./QuestionsNavbar.module.sass";

interface QuestionNavbarProps {
  data: string;
  title: string;
  topicID: number;
  fetchData: () => void;
}

const QuestionNavbar = ({
  data,
  title,
  topicID,
  fetchData,
}: QuestionNavbarProps) => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

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
        />
      )}
    </div>
  );
};

export default QuestionNavbar;
