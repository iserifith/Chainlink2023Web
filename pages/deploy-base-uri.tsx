import React from "react";
import dynamic from "next/dynamic";

const DeployBaseUriScreen = dynamic(
  () => import("../src/screens/DeployBaseUriScreen"),
  {
    ssr: false,
  }
);

const Page = () => {
  return <DeployBaseUriScreen />;
};

export default Page;
