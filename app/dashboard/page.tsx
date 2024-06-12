import "../../styles/Dashboard.sass";

import React from "react";

import Icon, { Icons } from "@/components/icons";
import NavbarComponent from "@/components/navbar";

import AuthWrapper from "../../components/firebase-auth/AuthWrapper";

interface ITopics {
  topicID: number;
  topicName: string;
  lastModified: string;
  status: string;
}

const getStatusColour = (status: string) => {
  switch (status) {
    case "Generating...":
      return "#FF7B00";
    case "Completed":
      return "#00ff00";
    case "Failed":
      return "#ff0000";
    default:
      return "#EEFF00";
  }
};

const DashboardComponent = () => {
  const topics: ITopics[] = [
    {
      topicName: "CS2030S Finals Practice",
      topicID: 1,
      lastModified: "12th June 2024",
      status: "Generating...",
    },
    {
      topicName: "CS2040S Mid-Term Practice",
      topicID: 3,
      lastModified: "23rd May 2024",
      status: "Attempting (5/10)",
    },
    {
      topicName: "CS2030S Mid-Term Practice",
      topicID: 2,
      lastModified: "3rd May 2024",
      status: "Completed",
    },
    {
      topicName: "CS2030S Mid-Term Practice",
      topicID: 2,
      lastModified: "3rd May 2024",
      status: "Completed",
    },
    {
      topicName: "CS2030S Mid-Term Practice",
      topicID: 2,
      lastModified: "3rd May 2024",
      status: "Completed",
    },
  ];

  return (
    <div className="dashboardComponent">
      <div className="topicMainHeaderWrapper">
        <h1 className="topicMainHeader">Your Topics</h1>
      </div>

      <div className="topics">
        {topics.map((topic) => {
          return (
            <div key={topic.topicID} className="topic">
              <div className="topicHeader">
                <input value={topic.topicName} className="topicName" />
                <Icon
                  type={Icons.Delete}
                  colour="#ff0000"
                  hoverEffects
                  className="topicDelete"
                />
              </div>

              <p style={{ color: getStatusColour(topic.status) }}>
                {topic.status}
              </p>

              <div className="topicFooter">
                <div></div>
                <p className="topicLastModified">
                  Last Modified: {topic.lastModified}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="newTopicWrapper">
        <button className="newTopic">
          <Icon type={Icons.Add} />
          <p>New Topic</p>
        </button>
      </div>
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
