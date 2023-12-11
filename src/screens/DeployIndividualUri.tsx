import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { formatUnits, parseEther, parseUnits } from "viem";
import {
  BRIDGE_ADDRESS,
  CHAINS_MAP,
  createBaseURINFT,
  createIndividualURINFT,
  estimateCostForCreateBaseURIToken,
  estimateCostForCreateIndividualURIBasedToken,
  getChainId,
  getWalletProvider,
  isValidAddress,
  writeContract,
} from "../utils/contracts";
import { usePopup } from "../components/Popup";
import { parse } from "path";
import { DESTINATION_CHAINS, shortenAddress } from "../utils/commons";
import { useAccount, useConnect } from "wagmi";
import Dropdown from "../components/Dropdown";
type Props = {};

const DeployIndividualUri = (props: Props) => {
  const [nftContractAddr, setNftContractAddr] = useState("");
  const [destinationChain, setDestinationChain] = useState("1");
  const [deployedTx, setDeployedTx] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { openPopup, renderPopup } = usePopup();

  const deployIndividualURINFT = async () => {
    setIsLoading(true);
    if (!isValidAddress(nftContractAddr)) {
      openPopup("Invalid address", "error");
      setIsLoading(false);
      return;
    }

    try {
      const estimatedCostWei =
        (await estimateCostForCreateIndividualURIBasedToken({
          nft: nftContractAddr,
          destinationChain: "1",
        })) as unknown as bigint;

      let fee;
      let markup;
      const markupPercentage = 20;
      fee = formatUnits(estimatedCostWei, 18);

      markup = parseFloat(fee) * (markupPercentage / 100);
      fee = parseFloat(fee) + markup;
      console.log("Estimated Cost with 20% Markup:", fee);

      const res = await createIndividualURINFT({
        nft: nftContractAddr,
        destinationChain: destinationChain,
        value: parseEther(fee + ""),
      });
      console.log(res);
      setIsLoading(false);
      setDeployedTx(res);
      openPopup(`Transaction sent: ${shortenAddress(res)}`, "success");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);

      const message =
        typeof error === "string"
          ? error
          : error?.message
          ? error.message
          : "Error";
      openPopup(message, "error");
    }
  };

  return (
    <>
      {renderPopup()}
      <div className="container flex flex-row gap-5">
        <div className="flex-1">
          <TextInput
            label="NFT Contract Address"
            value={nftContractAddr}
            onChange={(e) => setNftContractAddr(e.target.value)}
          />
          {/* <TextInput
            label="Destination Chain"
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value)}
          /> */}
          <Dropdown
            items={DESTINATION_CHAINS}
            onChange={(value: any) => {
              setDestinationChain(value);
            }}
            label="Destination Chain"
            value={destinationChain}
          />
          <Button
            loading={isLoading}
            label="Deploy Individual URI NFT"
            onClick={deployIndividualURINFT}
          />
        </div>
        <div className="flex-1 justify-center items-center m-5">
          <Button
            onClick={() => {
              window.open(`https://goerli.arbiscan.io/tx/${deployedTx}`);
            }}
            disabled={!deployedTx}
            label="goerli.arbiscan.io"
          />
          <Button
            onClick={() => {
              window.open(`https://ccip.chain.link/tx/${deployedTx}`);
            }}
            disabled={!deployedTx}
            label="ccip.chain.link"
          />
        </div>
      </div>
    </>
  );
};

export default DeployIndividualUri;
