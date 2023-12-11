import React from "react";
import dynamic from "next/dynamic";

const TransferScreen = dynamic(() => import("../src/screens/TransferScreen"), {
  ssr: false,
});

const Transfer = () => {
  return <TransferScreen />;
};

export default Transfer;
