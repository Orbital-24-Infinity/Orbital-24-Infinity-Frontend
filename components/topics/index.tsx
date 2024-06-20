"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import QuestionComponent, { IQuestion } from "./questions";
import styles from "./TopicComponent.module.sass";

interface IData {
  title: string;
  topicID: number;
  questions: IQuestion[];
}

const dummyData: IData = {
  title: "CS2040S Finals Practice",
  topicID: 2,
  questions: [
    {
      question: "What is the time complexity of binary search?",
      selected: 3,
      options: [
        {
          option: "O(n)",
          correct: false,
        },
        {
          option: "O(log n)",
          correct: true,
        },
        {
          option: "O(n log n)",
          correct: false,
        },
        {
          option: "O(n^2)",
          correct: false,
        },
      ],
    },
    {
      question: "What is the time complexity of quicksort?",
      selected: -1,
      options: [
        {
          option: "O(n)",
          correct: false,
        },
        {
          option: "O(log n)",
          correct: false,
        },
        {
          option: "O(n log n)",
          correct: true,
        },
        {
          option: "O(n^2)",
          correct: false,
        },
      ],
    },
    {
      question: "What is the time complexity of mergesort?",
      selected: -1,
      options: [
        {
          option: "O(n)",
          correct: false,
        },
        {
          option: "O(log n)",
          correct: false,
        },
        {
          option: "O(n log n)",
          correct: true,
        },
        {
          option: "O(n^2)",
          correct: false,
        },
      ],
    },
  ],
};

const TopicComponent = () => {
  const [questions, setQuestions] = useState(dummyData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  const updateQuestions = (newSelection: number) => {
    setQuestions((prev) => {
      let newQuestions = [...prev.questions];
      newQuestions[currentQuestion].selected = newSelection;
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  useEffect(() => {
    // TODO fetch questions from backend
    if (questions.questions.length <= 0) {
      router.push("/dashboard");
    }
  }, [questions, router]);

  return (
    <div className={styles.topicComponent}>
      <QuestionComponent
        question={questions.questions[currentQuestion]}
        questionNumber={currentQuestion}
        lastQuestionNumber={questions.questions.length - 1}
        onPrevQn={(newSelection: number) => {
          updateQuestions(newSelection);
          setCurrentQuestion((prev) => Math.max(0, prev - 1));
        }}
        onNextQn={(newSelection: number) => {
          if (
            newSelection >= 0 &&
            newSelection < questions.questions[currentQuestion].options.length
          ) {
            updateQuestions(newSelection);
            setCurrentQuestion((prev) =>
              Math.min(questions.questions.length - 1, prev + 1)
            );
          }
        }}
      />
    </div>
  );
};

export default TopicComponent;
