import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { TransferMyToken } from "../utils/contracts";
import { parseEther } from "viem";
import { usePopup } from "../components/Popup";

const TransferScreen = () => {
  const [nftContractAddr, setNftContractAddr] = useState("");
  const [destinationChain, setDestinationChain] = useState("1");
  const [tokenId, setTokenId] = useState("1");
  const { openPopup, renderPopup } = usePopup();
  const [loading, setLoading] = useState(false);

  const transfer = async () => {
    // openPopup("Transfering NFT", "info");
    try {
      setLoading(true);
      const fee = parseEther("0.01");
      const res = await TransferMyToken({
        nft: nftContractAddr,
        destinationChain: destinationChain,
        tokenId: tokenId,
        value: fee,
      });
      console.log(res);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      openPopup(error.message, "error");
      setLoading(false);
    }
  };

  return (
    <>
      {renderPopup()}
      <div className="container mx-auto p-5 flex flex-row gap-5">
        <div className="flex-1">
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
          <Button loading={loading} label="Transfer NFT" onClick={transfer} />
        </div>
        <div className="flex-1">
          {/* <h3 className="mx-3 font-mono font-semibold">Prerequisite</h3> */}
          <pre></pre>
        </div>
      </div>
    </>
  );
};

export default TransferScreen;
