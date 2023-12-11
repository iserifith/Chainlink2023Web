import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { parseEther } from "viem";
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

type Props = {};

const ContractOwnerView = (props: Props) => {
  const [nftContractAddr, setNftContractAddr] = useState(
    "0x04FEa3c81aC6e50D2F26FC7edb6E82c113E72FA5"
  );

  const [baseURI, setBaseURI] = useState("http://mybaseuri.com/");
  const [suffix, setSuffix] = useState(".json");
  const [offset, setOffset] = useState("0");
  const [baseZero, setBaseZero] = useState(false);
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
      const estimatedCost = (await estimateCostForCreateIndividualURIBasedToken(
        {
          nft: nftContractAddr,
          destinationChain: "1",
        }
      )) as unknown as bigint;

      // // const fee = parseUnits(estimatedCost + "", 18);
      // const fee = formatEther(estimatedCost, "gwei");
      // 2770378597231377
      const fee = 0.002770378597231377 * (110 / 100);

      const res = await createIndividualURINFT({
        nft: nftContractAddr,
        destinationChain: "1",
        value: parseEther(fee + ""),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deployBaseURINFT = async () => {
    setIsLoading(true);

    if (!isValidAddress(nftContractAddr)) {
      openPopup("Invalid address", "error");
      setIsLoading(false);
      return;
    }

    try {
      // const estimatedCost = (await estimateCostForCreateBaseURIToken({
      //   nft: nftContractAddr,
      //   baseURI: baseURI,
      //   suffix: suffix,
      //   offset: parseInt(offset),
      //   baseZero: baseZero,
      //   destinationChain: destinationChain,
      // })) as unknown as string;

      // const fee = parseEther(parseInt(estimatedCost) * (110 / 100) + "");
      // 0.005
      const fee = parseEther("0.05");
      console.log({ fee });
      const res = await createBaseURINFT({
        nft: nftContractAddr,
        baseURI: "http://mybaseuri.com/",
        suffix: ".json",
        offset: 0,
        baseZero: false,
        destinationChain: "1",
        value: fee,
      });
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {renderPopup()}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Contract Owner View</h1>
        <div className="flex justify-between items-center py-4">
          <div className="w-[40%]">
            <TextInput
              label="NFT Address"
              placeholder="0x000"
              onChange={(e) => setNftContractAddr(e.target.value)}
              value={nftContractAddr}
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

            <TextInput
              label="Destination Chain"
              placeholder="1"
              onChange={(e) => setDestinationChain(e.target.value)}
              value={destinationChain}
            />

            <div className="flex flex-row gap-5 my-2">
              <Button
                onClick={deployBaseURINFT}
                label="Base URI"
                loading={isLoading}
              />

              <Button
                onClick={deployIndividualURINFT}
                label="Individual URI"
                loading={isLoading}
              />
            </div>
          </div>
          <div className="w-[40%]">
            <h1>HEllo</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractOwnerView;
