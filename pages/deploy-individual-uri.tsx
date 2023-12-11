import React from "react";
import dynamic from "next/dynamic";

const DeployIndividualUri = dynamic(
  () => import("../src/screens/DeployIndividualUri"),
  {
    ssr: false,
  }
);

const Page = () => {
  return <DeployIndividualUri />;
};

export default Page;
