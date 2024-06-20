"use client";
import "../../styles/Dashboard.sass";

import { NextResponse } from "next/server";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import NewTopic from "@/components/dashboard/new-topic";
import Topic from "@/components/dashboard/topic";
import { ITopic, TopicStatus } from "@/components/dashboard/topic/constants";
import LoadingComponent from "@/components/firebase-auth/Loading/LoadingComponent";
import NavbarComponent from "@/components/navbar";

import AuthWrapper from "../../components/firebase-auth/AuthWrapper";

const DashboardComponent = () => {
  // Dummy Data
  // const topics: ITopic[] = [
  //   {
  //     topicName: "CS2030S Finals Practice",
  //     topicID: 1,
  //     lastModified: "12th June 2024",
  //     status: TopicStatus.GENERATING,
  //     questionsAttempted: 0,
  //     questionsTotal: 0,
  //   },
  //   {
  //     topicName: "CS2040S Mid-Term Practice",
  //     topicID: 3,
  //     lastModified: "23rd May 2024",
  //     status: TopicStatus.ATTEMPTING,
  //     questionsAttempted: 5,
  //     questionsTotal: 10,
  //   },
  //   {
  //     topicName: "CS2030S Mid-Term Practice",
  //     topicID: 2,
  //     lastModified: "3rd May 2024",
  //     status: TopicStatus.COMPLETED,
  //     questionsAttempted: 10,
  //     questionsTotal: 10,
  //   },
  //   {
  //     topicName: "CS2030S Mid-Term Practice",
  //     topicID: 4,
  //     lastModified: "3rd May 2024",
  //     status: TopicStatus.GENERATING,
  //     questionsAttempted: 0,
  //     questionsTotal: 0,
  //   },
  //   {
  //     topicName: "CS2030S Mid-Term Practice",
  //     topicID: 5,
  //     lastModified: "3rd May 2024",
  //     status: TopicStatus.COMPLETED,
  //     questionsAttempted: 10,
  //     questionsTotal: 10,
  //   },
  // ];

  const [user, isAuthLoading, error] = useAuthState(auth);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [isFetchingTopics, setIsFetchingTopics] = useState(true);

  const handleFetchTopics = useCallback(async () => {
    setIsFetchingTopics(true);
    const res: ITopic[] = await fetch("/api/topics/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
      }),
    }).then((res: Response) => res.json());
    res.map((topic) => {
      topic.lastModified = new Date(topic.lastModified);
    });
    setTopics(res);
    setIsFetchingTopics(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      handleFetchTopics();
    }
  }, [user, handleFetchTopics]);

  return (
    <div className="dashboardComponent">
      <div className="topicMainHeaderWrapper">
        <h1 className="topicMainHeader">Your Topics</h1>
      </div>

      <div className="topics">
        {(isAuthLoading || isFetchingTopics) && (
          <div className="dashboardTopicLoadingWrapper">
            <LoadingComponent />
          </div>
        )}
        {!isFetchingTopics && !isAuthLoading && topics.length === 0 && (
          <p className="emptyDashboard">
            {
              "It's rather empty here... What if you tried to click the New Topic button below?"
            }
          </p>
        )}
        {topics.map((topic, index) => (
          <Topic
            topic={topic}
            index={index}
            setTopic={(newName: string, lastModified?: Date) => {
              setTopics((prev) => {
                return prev.map((prevTopic) =>
                  prevTopic.topicID === topic.topicID
                    ? {
                        ...prevTopic,
                        topicName: newName,
                        lastModified: lastModified
                          ? lastModified
                          : prevTopic.lastModified,
                      }
                    : prevTopic
                );
              });
              return;
            }}
            key={topic.topicID}
            handleFetchTopics={handleFetchTopics}
          />
        ))}
      </div>

      <NewTopic handleFetchTopics={handleFetchTopics} />
    </div>
  );
};

const Dashboard = () => {
  return (
    <div style={{ height: "100vh" }}>
      <AuthWrapper>
        <NavbarComponent>
          <DashboardComponent />
        </NavbarComponent>
      </AuthWrapper>
    </div>
  );
};

export default Dashboard;
