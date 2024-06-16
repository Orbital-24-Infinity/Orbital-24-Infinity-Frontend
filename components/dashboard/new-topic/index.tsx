"use client";
import { useEffect, useState } from "react";

import Icon, { Icons } from "@/components/icons";
import Popup from "@/components/popup";

import styles from "./NewTopic.module.sass";

const NewTopic = () => {
  const accentColour = "#289497";
  const errorColour = "#FF0000";

  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [isNewTopicDetailsOpen, setIsNewTopicDetailsOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [trainingData, setTrainingData] = useState("");
  const [highlightColour, setHighlightColour] = useState(accentColour);
  const [highlightColourTrainingData, setHighlightColourTrainingData] =
    useState(accentColour);

  return (
    <div className={styles.newTopicWrapper}>
      <button
        className={styles.newTopic}
        onClick={(e) => setIsNewTopicOpen(true)}
      >
        <Icon type={Icons.Add} />
        <p>New Topic</p>
      </button>

      {isNewTopicOpen && (
        <Popup
          header="Give a name for your New Topic"
          text=""
          option1Text="Cancel"
          option2Text="Next"
          isTextDisabled={true}
          accentColour={accentColour}
          accentColourSecondary={accentColour}
          handleOption1={() => setIsNewTopicOpen(false)}
          handleOption2={() => {
            if (newTopicName !== "") {
              setIsNewTopicOpen(false);
              setIsNewTopicDetailsOpen(true);
            } else {
              setHighlightColour(errorColour);
            }
          }}
          isDefaultOption1
          isOption1Underlined={false}
        >
          <div className={styles.newNamePopupWrapper}>
            <input
              value={newTopicName}
              className={styles.editableText}
              style={{
                color: highlightColour,
                borderBottomColor: highlightColour,
              }}
              onChange={(e) => {
                setNewTopicName(e.target.value);
                setHighlightColour(accentColour);
              }}
              placeholder={"Insert topic name here..."}
            ></input>
            <div style={{ marginTop: "25px" }}></div>
          </div>
        </Popup>
      )}

      {isNewTopicDetailsOpen && (
        <Popup
          header="Upload your text/notes for..."
          text={newTopicName}
          option1Text="Back"
          option2Text="Generate"
          accentColour={accentColour}
          accentColourSecondary={accentColour}
          handleOption1={() => {
            setIsNewTopicDetailsOpen(false);
            setIsNewTopicOpen(true);
          }}
          handleOption2={() => {
            if (trainingData.length < 250) {
              setHighlightColourTrainingData(errorColour);
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
      )}
    </div>
  );
};

export default NewTopic;