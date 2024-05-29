import React from "react";
import AuthWrapper from "../firebase/AuthWrapper/AuthWrapper";
import Welcome from "./Welcome/Welcome";
import LogoutButton from "../firebase/LogoutButton/LogoutButton";

const DashboardComponent = () => {
  return (
    <div>
      <Welcome />
      <LogoutButton />
    </div>
  );
};

const Dashboard = () => {
  return (
    <AuthWrapper>
      <DashboardComponent />
    </AuthWrapper>
  );
};

export default Dashboard;
