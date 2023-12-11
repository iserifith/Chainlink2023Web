import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { TransferMyToken } from "../utils/contracts";
import { parseEther } from "viem";

type Props = {};

const UserView = (props: Props) => {
  const [nftContractAddr, setNftContractAddr] = useState("");
  const [destinationChain, setDestinationChain] = useState("1");
  const [tokenId, setTokenId] = useState("1");

  const transfer = async () => {
    try {
      const fee = parseEther("0.01");
      const res = await TransferMyToken({
        nft: nftContractAddr,
        destinationChain: destinationChain,
        tokenId: tokenId,
        value: fee,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <TextInput
        label="NFT Contract Address"
        value={nftContractAddr}
        onChange={(e) => setNftContractAddr(e.target.value)}
      />
      <TextInput
        label="Destination Chain"
        value={destinationChain}
        onChange={(e) => setDestinationChain(e.target.value)}
      />
      <TextInput
        label="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <Button label="Transfer NFT" onClick={transfer} />
    </div>
  );
};

export default UserView;
