import "../../styles/Dashboard.sass";

import React from "react";

import NavbarComponent from "@/components/navbar";

import AuthWrapper from "../../components/firebase-auth/AuthWrapper";

const DashboardComponent = () => {
  return (
    <div className="dashboardComponent">
      <h1 className="topicHeader">Your Topics</h1>

      <button className="newTopic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
        </svg>
        <p>New Topic</p>
      </button>
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
