"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import Popup from "@/components/popup";

import styles from "../NewTopic.module.sass";

interface PopupDetailsProps {
  handleFetchTopics: () => any;
  setIsLoadingTopics?: Dispatch<SetStateAction<boolean>>;
  setIsNewTopicDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setIsNewTopicOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  data?: string;
  updateDataInstead?: boolean;
  topicID?: number;
}

const PopupDetails = ({
  handleFetchTopics,
  setIsLoadingTopics = () => {},
  setIsNewTopicDetailsOpen,
  setIsNewTopicOpen = () => {},
  title = "",
  data = "",
  updateDataInstead = false,
  topicID = -1,
}: PopupDetailsProps) => {
  const accentColour = "#289497";
  const errorColour = "#FF0000";

  const [user, loading, error] = useAuthState(auth);

  const [newTopicName, setNewTopicName] = useState(title);
  const [trainingData, setTrainingData] = useState(data);
  const [highlightColourTrainingData, setHighlightColourTrainingData] =
    useState(accentColour);

  return (
    <Popup
      header={
        updateDataInstead
          ? "Edit your text/notes (Does not change existing questions)"
          : "Upload your text/notes for..."
      }
      text={newTopicName}
      option1Text={updateDataInstead ? "Cancel" : "Back"}
      option2Text={updateDataInstead ? "Update" : "Generate"}
      accentColour={accentColour}
      accentColourSecondary={accentColour}
      handleOption1={() => {
        setIsNewTopicDetailsOpen(false);
        setIsNewTopicOpen(true);
      }}
      handleOption2={() => {
        if (trainingData.length < 250) {
          setHighlightColourTrainingData(errorColour);
        } else {
          const handleNewTopic = async () => {
            try {
              setIsNewTopicDetailsOpen(false);
              setIsLoadingTopics(true);
              if (!updateDataInstead) {
                return await fetch("/api/topics/new", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user: user,
                    topic: { data: trainingData, title: newTopicName },
                  }),
                }).then((res) => {
                  handleFetchTopics();
                  setNewTopicName("");
                  setTrainingData("");
                });
              } else {
                return await fetch("/api/topics/update", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user: user,
                    topic: { data: trainingData, topicID: topicID },
                  }),
                }).then((res) => {
                  handleFetchTopics();
                });
              }
            } catch (error) {
              return;
            }
          };
          handleNewTopic();
        }
      }}
      handleDefault={() => setIsNewTopicDetailsOpen(false)}
      isDefaultOption1
      isOption1Underlined={false}
    >
      <div>
        <div style={{ marginTop: "25px" }}></div>
        <textarea
          placeholder="Insert text here..."
          value={trainingData}
          onChange={(e) => {
            setTrainingData(e.target.value);
            setHighlightColourTrainingData(accentColour);
          }}
          className={styles.trainingData}
          style={{
            borderColor: highlightColourTrainingData,
          }}
        ></textarea>
        {highlightColourTrainingData === errorColour && (
          <p className={styles.errorShort}>
            Your notes are a little short, try to add more content
          </p>
        )}
      </div>
    </Popup>
  );
};

export default PopupDetails;
