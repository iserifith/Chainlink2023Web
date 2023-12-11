import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ContractOwnerView from "./ContractOwnerView";
import UserView from "./UserView";

type Props = {};

const HomeScreen = (props: Props) => {
  const { address, isConnected } = useAccount();
  const [nftAddress, setNFTAddress] = useState<string>("");
  const [isContractOwnerView, setIsContractOwnerView] = useState<boolean>(true);

  const handleNftAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNFTAddress(e.target.value);
  };

  const toggleView = () => {
    setIsContractOwnerView(!isContractOwnerView);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">NFT Bridge</h1>
        <nav className="flex justify-between items-center">
          <div className="mr-[12px]">
            {isConnected && (
              <button
                onClick={toggleView}
                className="shadow-lg px-[10px] py-[8px] rounded-lg font-bold"
              >
                {isContractOwnerView ? "Contract Owner View" : "User View"}
              </button>
            )}
          </div>
          <div>
            <ConnectButton />
          </div>
        </nav>
      </header>

      <main>{isContractOwnerView ? <ContractOwnerView /> : <UserView />}</main>
    </div>
  );
};

export default HomeScreen;
