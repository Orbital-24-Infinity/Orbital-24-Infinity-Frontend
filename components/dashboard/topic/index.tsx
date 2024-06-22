"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { getDateNow } from "@/app/api/login/date";
import { auth } from "@/app/firebase/config";
import Icon, { Icons } from "@/components/icons";
import Popup from "@/components/popup";

import ActionButton from "../actions";
import { ITopic, TopicStatus } from "./constants";
import styles from "./Topic.module.sass";

interface ITopicProps {
  topic: ITopic;
  setTopic: (newName: string, lastModified?: Date) => void;
  setIsLoadingTopics: Dispatch<SetStateAction<boolean>>;
  handleFetchTopics: () => void;
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

const Topic = ({
  topic,
  setTopic,
  setIsLoadingTopics,
  handleFetchTopics,
}: ITopicProps) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [topicNameLastEdited, setLastEdited] = useState<Date>();

  useEffect(() => {
    if (topicNameLastEdited?.getTime()) {
      const autosaveTimeout = setTimeout(async () => {
        try {
          const res = await fetch("/api/topics/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user,
              topic: topic,
            }),
          }).then(async (res: any) => {
            res = await res.json();
            if (res.success) {
              setTopic(topic.topicName, new Date(res.data.lastModified));
            }
          });
        } catch {}
      }, 2500);
      return () => clearTimeout(autosaveTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicNameLastEdited]);

  return (
    <div key={topic.topicID} className={styles.topic}>
      <div className={styles.topicHeader}>
        <input
          value={topic.topicName}
          className={styles.topicName}
          onChange={(e) => {
            if (topic.topicName) {
              setTopic(e.target.value);
              setLastEdited(getDateNow());
            }
          }}
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
          Last Modified: {topic.lastModified?.toLocaleDateString()}{" "}
          {topic.lastModified.toLocaleTimeString()}
        </p>
      </div>

      {isDeleteClicked && (
        <Popup
          header={"Are you sure you want to delete the following..."}
          text={topic.topicName}
          handleOption1={() => {
            setIsDeleteClicked(false);
            setIsLoadingTopics(true);
            fetch("/api/topics/delete", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: user,
                topic: topic,
              }),
            }).then((res) => {
              handleFetchTopics();
            });
          }}
          handleOption2={() => setIsDeleteClicked(false)}
          option1Text="Yes, destroy it now!"
          option2Text="No, I'll keep it for now"
        />
      )}
    </div>
  );
};

export default Topic;
