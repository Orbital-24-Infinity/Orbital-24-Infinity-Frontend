import "../../../styles/Topic.sass";

import NavbarComponent from "@/components/navbar";
import TopicComponent from "@/components/topics";

import AuthWrapper from "../../../components/firebase-auth/AuthWrapper";

const TopicPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <AuthWrapper>
        <NavbarComponent>
          <TopicComponent />
        </NavbarComponent>
      </AuthWrapper>
    </div>
  );
};

export default TopicPage;
