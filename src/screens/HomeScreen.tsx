import React, { useState } from "react";
import Button from "../components/Button";
import { useRouter } from "next/router";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useMount, useSetState } from "react-use";
import { useAccount } from "wagmi";
import { usePopup } from "../components/Popup";

interface State {
  run: boolean;
  steps: Step[];
}

const HomeScreen = () => {
  const { openPopup, renderPopup } = usePopup();
  const { isConnected } = useAccount();
  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: <h2>Lets start!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: (
          <div>
            <h2>Deploy Base URI Token</h2>
            <p>Deploy a token with a base URI</p>
            <link href="" />
          </div>
        ),
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },

        target: "#deploy-base-uri",
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }

    // logGroup(type, data);
  };

  const router = useRouter();
  return (
    <>
      {renderPopup()}
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <div className="flex container mx-auto flex-row gap-10">
        <div className="flex-1">
          <div className="my-5 shadow-sm p-5">
            <h2 className="mx-3 font-mono font-semibold">
              Token Owner Actions
            </h2>
            <Button
              onClick={() => router.push("/transfer")}
              label="Transfer Token"
            ></Button>
          </div>
          <div className="my-5 shadow-sm p-5">
            <h2 className="mx-3 font-mono font-semibold">
              Contract Owner Actions
            </h2>
            <Button
              id="deploy-base-uri"
              onClick={() => {
                if (isConnected) {
                  router.push("/deploy-base-uri");
                } else {
                  openPopup("Wallet not connected", "error");
                }
              }}
              label="Deploy Base URI Token"
            ></Button>
            <Button
              id="deploy-individual-uri"
              onClick={() => {
                if (isConnected) {
                  router.push("/deploy-individual-uri");
                } else {
                  openPopup("Wallet not connected", "error");
                }
              }}
              label="Deploy Individual URI Token"
            ></Button>
            <Button
              id="set-approval"
              onClick={() => {
                // router.push("/set-approval")
                if (isConnected) {
                  router.push("/set-approval");
                } else {
                  openPopup("Wallet not connected", "error");
                }
              }}
              label="Set Approval for Operator"
            ></Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="p-5 my-5">
            {/* <h3 className="text-2xl font-bold">Use case scenario</h3>
          <span>User wants to transfer ERC721 tokens between two chains</span>
          <span>ERC721 has the following fields:</span>
          <ul className="list-disc">
            <li>name</li>
            <li>symbol</li>
            <li>owner</li>
          </ul>
          <span>and optionally for baseURI tokens</span>
          <ul className="list-disc">
            <li>BaseURI</li>
            <li>offset (for PFP based tokens with a VRF reveal)</li>
            <li>tokens could start at 0 or 1 (for shift overflow)</li>
          </ul> */}
            {/* <h3 className="mx-3 font-mono font-semibold">Prerequisite</h3> */}
            <pre></pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
