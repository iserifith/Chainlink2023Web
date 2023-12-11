import React from "react";
import dynamic from "next/dynamic";

const SetApprovalScreen = dynamic(
  () => import("../src/screens/SetApprovalScreen"),
  {
    ssr: false,
  }
);

const Page = () => {
  return <SetApprovalScreen />;
};

export default Page;
