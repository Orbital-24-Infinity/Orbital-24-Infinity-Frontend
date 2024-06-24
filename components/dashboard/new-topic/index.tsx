"use client";
import { Dispatch, SetStateAction, useState } from "react";

import Icon, { Icons } from "@/components/icons";
import Popup from "@/components/popup";

import styles from "./NewTopic.module.sass";
import PopupDetails from "./popup-details";

interface NewTopicProps {
  handleFetchTopics: () => any;
  setIsLoadingTopics: Dispatch<SetStateAction<boolean>>;
}

const NewTopic = ({ handleFetchTopics, setIsLoadingTopics }: NewTopicProps) => {
  const accentColour = "#289497";
  const errorColour = "#FF0000";

  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [isNewTopicDetailsOpen, setIsNewTopicDetailsOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [highlightColour, setHighlightColour] = useState(accentColour);

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
        <PopupDetails
          handleFetchTopics={handleFetchTopics}
          setIsLoadingTopics={setIsLoadingTopics}
          setIsNewTopicDetailsOpen={setIsNewTopicDetailsOpen}
          setIsNewTopicOpen={setIsNewTopicOpen}
          title={newTopicName}
        />
      )}
    </div>
  );
};

export default NewTopic;
