// import React from "react";

// type Props = {};

// const DeployBaseUriScreen = (props: Props) => {
//   return <div>DeployBaseUriScreen</div>;
// };

// export default DeployBaseUriScreen;

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

const DeployBaseUriScreen = (props: Props) => {
  const [nftContractAddr, setNftContractAddr] = useState("");

  const [baseURI, setBaseURI] = useState("");
  const [suffix, setSuffix] = useState(".json");
  const [offset, setOffset] = useState("0");
  const [baseZero, setBaseZero] = useState(false);
  const [destinationChain, setDestinationChain] = useState("1");

  const [deployedTx, setDeployedTx] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { openPopup, renderPopup } = usePopup();

  const deployBaseURINFT = async () => {
    setIsLoading(true);

    if (!isValidAddress(nftContractAddr)) {
      openPopup("Invalid address", "error");
      setIsLoading(false);
      return;
    }

    try {
      const estimatedCostWei = (await estimateCostForCreateBaseURIToken({
        nft: nftContractAddr,
        baseURI: baseURI,
        suffix: suffix,
        offset: parseInt(offset),
        baseZero: baseZero,
        destinationChain: destinationChain,
      })) as unknown as bigint;

      let fee;
      let markup;
      const markupPercentage = 20;
      fee = formatUnits(estimatedCostWei, 18);

      markup = parseFloat(fee) * (markupPercentage / 100);
      fee = parseFloat(fee) + markup;
      console.log("Estimated Cost with 20% Markup:", fee);

      const res = await createBaseURINFT({
        nft: nftContractAddr,
        baseURI: "http://mybaseuri.com/",
        suffix: ".json",
        offset: 0,
        baseZero: false,
        destinationChain: "1",
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
            label="NFT Address"
            placeholder="0x000"
            onChange={(e) => setNftContractAddr(e.target.value)}
            value={nftContractAddr}
          />

          <Dropdown
            items={DESTINATION_CHAINS}
            onChange={(value: any) => {
              setDestinationChain(value);
            }}
            label="Destination Chain"
            value={destinationChain}
          />

          <TextInput
            label="Base URI"
            placeholder="http://mybaseuri.com/"
            onChange={(e) => setBaseURI(e.target.value)}
            value={baseURI}
          />

          <TextInput
            label="Suffix"
            placeholder=".json"
            onChange={(e) => setSuffix(e.target.value)}
            value={suffix}
          />

          <TextInput
            label="Offset"
            placeholder="0"
            onChange={(e) => setOffset(e.target.value)}
            value={offset}
          />

          <div className="flex items-center my-2">
            <label className="mr-2">Base Zero</label>
            <input
              className="mr-2"
              type="checkbox"
              onChange={(e) => setBaseZero(e.target.checked)}
              checked={baseZero}
            />
          </div>

          {/* <TextInput
            label="Destination Chain"
            placeholder="1"
            onChange={(e) => setDestinationChain(e.target.value)}
            value={destinationChain}
          /> */}

          <Button
            loading={isLoading}
            label="Deploy Base URI NFT"
            onClick={deployBaseURINFT}
            disabled={isLoading}
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

export default DeployBaseUriScreen;
