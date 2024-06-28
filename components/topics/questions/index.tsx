"use client";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";

import styles from "./Questions.module.sass";

export interface IQuestionOptions {
  id: number;
  option: string;
  correct: boolean;
  questionID: number;
}

export interface IQuestion {
  question: string;
  selected: number;
  questionID: number;
  options: Prisma.QuestionOptionsUncheckedCreateInput[];
  marked: boolean;
}

interface QuestionComponentProps {
  question: IQuestion;
  questionNumber: number;
  topicID: number;
  lastQuestionNumber: number;
  isMarked: boolean;
  handleMark: (questionNumber: number) => void;
  onPrevQn: (newSelection: number) => void;
  onNextQn: (newSelection: number) => void;
}

const QuestionComponent = ({
  question,
  questionNumber,
  topicID,
  lastQuestionNumber,
  isMarked,
  handleMark,
  onPrevQn,
  onNextQn,
}: QuestionComponentProps) => {
  const [user, isAuthLoading, error] = useAuthState(auth);
  const [selectedOption, setSelectedOption] = useState(question.selected);

  const handleUpdatedSelection = async (newSelection: number) => {
    setSelectedOption(newSelection);
    // console.log(question, newSelection);
    // console.log({
    //   id: question.questionID,
    //   selected: newSelection,
    // });
    const out = await fetch("/api/topics/update-selections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        topic: {
          topicID: topicID,
        },
        question: {
          id: question.questionID,
          selected: newSelection,
        },
      }),
    });
    // console.log(await out.json());
  };

  useEffect(() => {
    // console.log(question);
    setSelectedOption(question.selected);
  }, [question]);

  return (
    <div className={styles.questionComponent}>
      <div className={styles.questionSubNavbar}>
        <h1 className={styles.questionNumber}>Q{questionNumber + 1}</h1>
        {!isMarked && selectedOption !== -1 && (
          <button onClick={(e) => handleMark(questionNumber)}>
            Reveal Answer
          </button>
        )}
      </div>
      <h1 className={styles.questionText}>{question.question}</h1>

      <div className={styles.questionOptions}>
        {question.options.map(
          (
            option: Prisma.QuestionOptionsUncheckedCreateInput,
            index: number
          ) => (
            <button
              key={index}
              className={styles.questionOption}
              onClick={(e) => {
                if (!isMarked) {
                  handleUpdatedSelection(question.options[index].id ?? -1);
                }
              }}
              style={{
                backgroundColor:
                  isMarked && question.options[index].correct
                    ? "#0B701B"
                    : selectedOption === question.options[index].id
                      ? !isMarked
                        ? "#219C8C"
                        : "#801111"
                      : isMarked
                        ? "#1B1B1B"
                        : "",
              }}
            >
              {option.option}
            </button>
          )
        )}
      </div>

      <div className={styles.questionNavigationWrapper}>
        {questionNumber > 0 && (
          <button
            className={styles.prevQn}
            onClick={(e) => onPrevQn(selectedOption)}
          >
            Previous Question
          </button>
        )}
        <button
          className={styles.nextQn}
          style={{
            backgroundColor:
              selectedOption >= 0
                ? questionNumber === lastQuestionNumber
                  ? "#006391"
                  : "#219C8C"
                : "",
          }}
          onClick={(e) => onNextQn(selectedOption)}
        >
          {questionNumber !== lastQuestionNumber ? "Next" : "Back to Dashboard"}
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;
