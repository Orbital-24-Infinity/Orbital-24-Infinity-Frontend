import "../../styles/Dashboard.sass";

import React from "react";

import NewTopic from "@/components/dashboard/new-topic";
import Task from "@/components/dashboard/topic";
import { ITask, TaskStatus } from "@/components/dashboard/topic/constants";
import NavbarComponent from "@/components/navbar";

import AuthWrapper from "../../components/firebase-auth/AuthWrapper";

const DashboardComponent = () => {
  const topics: ITask[] = [
    {
      topicName: "CS2030S Finals Practice",
      topicID: 1,
      lastModified: "12th June 2024",
      status: TaskStatus.GENERATING,
      questionsAttempted: 0,
      questionsTotal: 0,
    },
    {
      topicName: "CS2040S Mid-Term Practice",
      topicID: 3,
      lastModified: "23rd May 2024",
      status: TaskStatus.ATTEMPTING,
      questionsAttempted: 5,
      questionsTotal: 10,
    },
    {
      topicName: "CS2030S Mid-Term Practice",
      topicID: 2,
      lastModified: "3rd May 2024",
      status: TaskStatus.COMPLETED,
      questionsAttempted: 10,
      questionsTotal: 10,
    },
    {
      topicName: "CS2030S Mid-Term Practice",
      topicID: 4,
      lastModified: "3rd May 2024",
      status: TaskStatus.CREATED,
      questionsAttempted: 0,
      questionsTotal: 0,
    },
    {
      topicName: "CS2030S Mid-Term Practice",
      topicID: 5,
      lastModified: "3rd May 2024",
      status: TaskStatus.COMPLETED,
      questionsAttempted: 10,
      questionsTotal: 10,
    },
  ];

  return (
    <div className="dashboardComponent">
      <div className="topicMainHeaderWrapper">
        <h1 className="topicMainHeader">Your Topics</h1>
      </div>

      <div className="topics">
        {topics.length === 0 && (
          <p className="emptyDashboard">
            {
              "It's rather empty here... What if you tried to click the New Topic button below?"
            }
          </p>
        )}
        {topics.map((topic) => (
          <Task topic={topic} key={topic.topicID} />
        ))}
      </div>

      <NewTopic />
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
