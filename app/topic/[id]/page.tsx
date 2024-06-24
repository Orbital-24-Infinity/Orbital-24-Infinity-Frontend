import "@/styles/Topic.sass";

import { GetServerSideProps, NextPageContext } from "next";

import AuthWrapper from "@/components/firebase-auth/AuthWrapper";
import NavbarComponent from "@/components/navbar";
import TopicComponent from "@/components/topics";

// export const getServerSideProps = async (context: any) => {
//   const { params } = context.req;
//   const { id } = params;
//   return { props: { id } };
// };

const TopicPage = async () => {
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
