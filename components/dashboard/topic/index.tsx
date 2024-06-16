"use client";
import { useState } from "react";

import Icon, { Icons } from "@/components/icons";
import Popup from "@/components/popup";

import ActionButton from "../actions";
import { ITopic, TopicStatus } from "./constants";
import styles from "./Topic.module.sass";

interface ITopicProps {
  topic: ITopic;
}

const getStatusColour = (status: string) => {
  switch (status) {
    case TopicStatus.GENERATING:
      return "#D66800";
    case TopicStatus.COMPLETED:
      return "#14C514";
    // case TopicStatus.CREATED:
    //   return "#9E18D3";
    default:
      return "#D0DB2B";
  }
};

const Topic = ({ topic }: ITopicProps) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  return (
    <div key={topic.topicID} className={styles.topic}>
      <div className={styles.topicHeader}>
        <input
          value={topic.topicName}
          className={styles.topicName}
          onChange={(e) => {}}
        />
        <button
          onClick={(e) => setIsDeleteClicked(true)}
          className={styles.topicDeleteButton}
        >
          <Icon
            type={Icons.Delete}
            colour="#ff0000"
            hoverEffects
            className={styles.topicDelete}
          />
        </button>
      </div>

      <p style={{ color: getStatusColour(topic.status) }}>
        {topic.status +
          (topic.status === TopicStatus.ATTEMPTING
            ? " (" + topic.questionsAttempted + "/" + topic.questionsTotal + ")"
            : "")}
      </p>

      <div className={styles.topicFooter}>
        <ActionButton type={topic.status} id={topic.topicID} />
        <p className={styles.topicLastModified}>
          Last Modified: {topic.lastModified}
        </p>
      </div>

      {isDeleteClicked && (
        <Popup
          header={"Are you sure you want to delete the following..."}
          text={topic.topicName}
          handleOption1={() => {}}
          handleOption2={() => setIsDeleteClicked(false)}
          option1Text="Yes, destroy it now!"
          option2Text="No, I'll keep it for now"
        />
      )}
    </div>
  );
};

export default Topic;
