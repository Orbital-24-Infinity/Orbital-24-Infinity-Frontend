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
interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const parseQuestions = (input: string): Question[] => {
  const questionBlocks = input.split("#question: ").slice(1); // Split by `#question: ` and ignore the first empty element

  const removeLeadingTrailingWhitespace = (str: string): string => {
    let start = 0;
    let end = str.length;

    while (start < end && str[start] === " ") start++;
    while (end > start && str[end - 1] === " ") end--;

    return str.slice(start, end);
  };

  return questionBlocks.map((block) => {
    const parts = block.split(" answer: ");
    const questionPart = parts[0];
    const answerPart = parts[1];

    const questionParts = questionPart.split("#options: ");
    const question = removeLeadingTrailingWhitespace(questionParts[0]);
    const optionsString = questionParts[1];

    // Match the options with a regex pattern
    const optionsPattern = /[A-D]\. ([^#]+?)(?=(?: [A-D]\. |$))/g;
    const answers: string[] = [];
    let match;
    while ((match = optionsPattern.exec(optionsString)) !== null) {
      answers.push(removeLeadingTrailingWhitespace(match[1]));
    }

    const correctAnswer = removeLeadingTrailingWhitespace(answerPart);

    return { question, answers, correctAnswer };
  });
};

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
                }).then(async (res) => {
                  const newTopic = await res.json();
                  handleFetchTopics();
                  setNewTopicName("");
                  setTrainingData("");
                  await fetch("/api/questions/generate", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user: user,
                      data: {
                        title: newTopicName,
                        passage: trainingData,
                        id: newTopic.id,
                      },
                      topic: {
                        isGenerating: false,
                        topicID: newTopic.id,
                      },
                    }),
                  }).then(async (res) => {
                    // const r = await res.json();
                    // console.log(parseQuestions(r.questions));
                    handleFetchTopics();
                  });
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
