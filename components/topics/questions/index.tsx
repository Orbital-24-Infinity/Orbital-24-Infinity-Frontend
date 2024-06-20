"use client";
import { useEffect, useState } from "react";

import styles from "./Questions.module.sass";

export interface IQuestionOptions {
  option: string;
  correct: boolean;
}

export interface IQuestion {
  question: string;
  selected: number;
  options: IQuestionOptions[];
}

interface QuestionComponentProps {
  question: IQuestion;
  questionNumber: number;
  lastQuestionNumber: number;
  onPrevQn: (newSelection: number) => void;
  onNextQn: (newSelection: number) => void;
}

const QuestionComponent = ({
  question,
  questionNumber,
  lastQuestionNumber,
  onPrevQn,
  onNextQn,
}: QuestionComponentProps) => {
  const [selectedOption, setSelectedOption] = useState(question.selected);

  useEffect(() => {
    setSelectedOption(question.selected);
  }, [question]);

  return (
    <div className={styles.questionComponent}>
      <h1 className={styles.questionNumber}>Q{questionNumber + 1}</h1>
      <h1 className={styles.questionText}>{question.question}</h1>

      <div className={styles.questionOptions}>
        {question.options.map((option: IQuestionOptions, index: number) => (
          <button
            key={index}
            className={styles.questionOption}
            onClick={(e) => setSelectedOption(index)}
            style={{
              backgroundColor: selectedOption === index ? "#219C8C" : "",
            }}
          >
            {option.option}
          </button>
        ))}
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
            backgroundColor: selectedOption >= 0 ? "#219C8C" : "",
          }}
          onClick={(e) => onNextQn(selectedOption)}
        >
          {questionNumber !== lastQuestionNumber ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;
