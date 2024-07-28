"use client";

import { Prisma } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import { ITopic, TopicStatus } from "@/components/dashboard/topic/constants";

import LoadingComponent from "../firebase-auth/Loading/LoadingComponent";
import QuestionComponent, { IQuestion } from "./questions";
import QuestionNavbar from "./questions/questions-navbar";
import styles from "./TopicComponent.module.sass";

interface IData {
  title: string;
  topicID: number;
  questions: IQuestion[];
}

const TopicComponent = () => {
  const [user, isAuthLoading, error] = useAuthState(auth);
  const [topic, setTopic] = useState<ITopic>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const router = useRouter();
  const searchParams = useParams();
  const { id } = searchParams;
  const thisTopicID = parseInt(typeof id === "string" ? id : id[0]);
  const [linkedFiles, setLinkedFiles] = useState<
    Prisma.FileUncheckedCreateInput[]
  >([]);

  const [questions, setQuestions] = useState<IData>({
    title: "",
    topicID: thisTopicID,
    questions: [
      {
        question: "",
        refData: "",
        questionID: -1,
        selected: -1,
        options: [{ id: -1, questionID: -1, option: "", correct: false }],
        marked: false,
      },
    ],
  });

  const updateQuestionsSelection = (newSelection: number) => {
    if (newSelection >= 0) {
      setQuestions((prev) => {
        let newQuestions = [...prev.questions];
        newQuestions[currentQuestion].selected = newSelection;
        return {
          ...prev,
          questions: newQuestions,
        };
      });
    }
  };

  const fetchData = useCallback(() => {
    const asyncFetchData = async () => {
      const res: ITopic[] = await fetch("/api/topics/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          single: true,
          topicID: questions.topicID,
        }),
      }).then((res: Response) => res.json());
      if (
        res.length <= 0 ||
        res[0].questions.length <= 0 ||
        res[0].status === TopicStatus.GENERATING
      ) {
        router.push("/dashboard");
      } else {
        let firstUnanswered = -1;
        setTopic(res[0]);
        setQuestions({
          title: res[0].topicName,
          topicID: thisTopicID,
          questions: res[0].questions.reduce((acc, eachOption, index) => {
            if (eachOption.selected === -1 && firstUnanswered === -1) {
              firstUnanswered = index;
            }
            return acc.concat([
              {
                question: eachOption.question,
                refData: eachOption.refData ?? "",
                questionID: eachOption.id ?? -1,
                selected: eachOption.selected ? eachOption.selected : -1,
                options: res[0].questionsOptions[index],
                marked: eachOption.marked ?? false,
              },
            ]);
          }, [] as IQuestion[]),
        });
        setCurrentQuestion(firstUnanswered === -1 ? 0 : firstUnanswered);
        setLinkedFiles(res[0].files);
        setIsFetchingData(false);
      }
    };
    setIsFetchingData(true);
    asyncFetchData();
  }, [user, questions.topicID, router, thisTopicID]);

  const handleMarking = async (questionNumber: number) => {
    setQuestions((prev) => {
      let newQuestions = [...prev.questions];
      newQuestions[questionNumber].marked = true;
      return {
        ...prev,
        questions: newQuestions,
      };
    });
    await fetch("/api/topics/update-selections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        topic: {
          topicID: thisTopicID,
        },
        question: {
          id: questions.questions[questionNumber].questionID,
          marked: true,
        },
      }),
    });
  };

  const handleTitleChange = async (newName: string) => {
    setQuestions((prev) => ({
      ...prev,
      title: newName,
    }));
  };

  useEffect(() => {
    if (!topic && user && !isAuthLoading) {
      fetchData();
    }
  }, [topic, user, fetchData, isAuthLoading]);

  return (
    <div className={styles.topicComponent}>
      {isAuthLoading || isFetchingData ? (
        <LoadingComponent />
      ) : questions.title !== "" && questions.questions.length > 0 ? (
        <div>
          <QuestionNavbar
            data={topic?.data ? topic.data : ""}
            title={questions?.title ? questions.title : ""}
            fetchData={fetchData}
            topicID={questions.topicID}
            linkedFiles={linkedFiles}
            handleTitleChange={handleTitleChange}
          />
          <QuestionComponent
            question={questions.questions[currentQuestion]}
            questionNumber={currentQuestion}
            isMarked={questions.questions[currentQuestion].marked}
            handleMark={handleMarking}
            lastQuestionNumber={questions.questions.length - 1}
            onPrevQn={(newSelection: number) => {
              if (newSelection >= 0) {
                updateQuestionsSelection(newSelection);
              }
              setCurrentQuestion((prev) => Math.max(0, prev - 1));
            }}
            topicID={topic?.topicID ?? -1}
            onNextQn={(newSelection: number) => {
              if (newSelection >= 0) {
                updateQuestionsSelection(newSelection);
                if (currentQuestion === questions.questions.length - 1) {
                  router.push("/dashboard");
                } else {
                  setCurrentQuestion((prev) =>
                    Math.min(questions.questions.length - 1, prev + 1)
                  );
                }
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopicComponent;
