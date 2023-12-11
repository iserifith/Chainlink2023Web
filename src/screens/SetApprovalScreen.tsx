import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import {
  BRIDGE_ADDRESS,
  CHAINS_MAP,
  getWalletProvider,
  writeContract,
} from "../utils/contracts";
import { usePopup } from "../components/Popup";

type Props = {};

const SetApprovalScreen = (props: Props) => {
  const { openPopup, renderPopup } = usePopup();
  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [nftAddress, setNftAddress] = useState("");

  const setApprovalForAll = async () => {
    try {
      const wallet = getWalletProvider(CHAINS_MAP.ARBITRUM_GOERLI);
      const [account] = await wallet.getAddresses();
      const req = await writeContract({
        address: nftAddress as `0x${string}`,
        abi,
        functionName: "setApprovalForAll",
        args: [BRIDGE_ADDRESS, true],
        chainName: CHAINS_MAP.ARBITRUM_GOERLI,
        account: account,
        wallet,
      });
      console.log(req);
      openPopup("Success", "success");
    } catch (error) {
      console.log(error);
      openPopup("Error", "error");
    }
  };

  return (
    <>
      {renderPopup()}
      <div className="container mx-auto">
        <TextInput
          label="NFT Address"
          placeholder="0x000"
          onChange={(e) => setNftAddress(e.target.value)}
          value={nftAddress}
        />
        <Button onClick={setApprovalForAll} label="Set Approval" />
      </div>
    </>
  );
};

export default SetApprovalScreen;
