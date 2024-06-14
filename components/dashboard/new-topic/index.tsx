"use client";
import { useEffect, useState } from "react";

import Icon, { Icons } from "@/components/icons";
import Popup from "@/components/popup";

import styles from "./NewTopic.module.sass";

const NewTopic = () => {
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [isNewTopicDetailsOpen, setIsNewTopicDetailsOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  useEffect(() => {
    console.log(newTopicName);
  }, [newTopicName]);

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
          placeholder="Write something unique here..."
          option1Text="Cancel"
          option2Text="Next"
          accentColour="#009ECE"
          accentColourSecondary="#00BFFF"
          handleYes={() => setIsNewTopicOpen(false)}
          handleNo={(e) => {
            if (e.value !== "") {
              setNewTopicName(e.value);
              setIsNewTopicOpen(false);
              setIsNewTopicDetailsOpen(true);
            }
          }}
          isTextEditable
          isDefaultOption1
        >
          <div style={{ marginTop: "25px" }}></div>
        </Popup>
      )}

      {isNewTopicDetailsOpen && (
        <Popup
          header={newTopicName}
          text="Upload your content and/or text"
          option1Text="Cancel"
          option2Text="Generate"
          accentColour="#009ECE"
          accentColourSecondary="#00BFFF"
          handleYes={() => setIsNewTopicDetailsOpen(false)}
          handleNo={(e) => {}}
          isDefaultOption1
        >
          <div style={{ marginTop: "25px" }}></div>
        </Popup>
      )}
    </div>
  );
};

export default NewTopic;
