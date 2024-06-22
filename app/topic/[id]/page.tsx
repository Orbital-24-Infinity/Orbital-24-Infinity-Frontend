import "@/styles/Topic.sass";

import AuthWrapper from "@/components/firebase-auth/AuthWrapper";
import NavbarComponent from "@/components/navbar";
import TopicComponent from "@/components/topics";

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
