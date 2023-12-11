"use client";

import {
  Account,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  isAddress,
  parseEther,
} from "viem";
import { Chain } from "viem/_types/types/chain";
import {
  sepolia,
  mainnet,
  goerli,
  arbitrum,
  arbitrumGoerli,
  arbitrumSepolia,
} from "viem/chains";
import BRIDGE_ABI from "./bridge_abi.json";
import BRIDGE_ADMIN_ABI from "./bridge_admin_abi.json";
import { type } from "os";
const ethereum = (window as any).ethereum;

export const CHAINS_MAP = {
  sepholia: "sepolia",
  MAINNET: "mainnet",
  GOERLI: "goerli",
  ARBITRUM: "arbitrum",
  ARBITRUM_GOERLI: "arbitrumGoerli",
  ARBITRUM_SEPHOLIA: "arbitrumSepolia",
};

export const getChainName = (chainId: string) => {
  switch (chainId) {
    case "sepolia":
      return "sepolia";
    case "1":
      return "MAINNET";
    case "5":
      return "GOERLI";
    case "42161":
      return "ARBITRUM";
    case "421611":
      return "ARBITRUM_GOERLI";
    case "421612":
      return "ARBITRUM_SEPHOLIA";
    default:
      return "sepolia";
  }
};

export const getChainId = (chainName: string) => {
  switch (chainName) {
    case "sepolia":
      return "11155111";
    case "mainnet":
      return "1";
    case "goerli":
      return "5";
    case "arbitrum":
      return "42161";
    case "arbitrumGoerli":
      return "421613";
    case "arbitrumSepolia":
      return "421614";
    default:
      return "11155111";
  }
};

export const getChain = (chainName: string): Chain => {
  console.log(chainName, "getChain");
  switch (chainName) {
    case "sepolia":
      return sepolia;
    case "mainnet":
      return mainnet;
    case "goerli":
      return goerli;
    case "arbitrum":
      return arbitrum;
    case "arbitrumGoerli":
      return arbitrumGoerli;
    case "arbitrumSepolia":
      return arbitrumSepolia;
    default:
      return sepolia;
  }
};

export const BRIDGE_ADDRESS = "0x8F365b59461266c9DD93a488b10d5B0Aa0AEee69";
export const BRIDGE_ADMIN_ADDRESS =
  "0x1b418cC2CA3795aE6CDfce214413A738efA42119";

export const getPublicProvider = (chainName: string) => {
  const client = createPublicClient({
    chain: getChain(chainName),
    transport: http(
      // `https://${chainName}.infura.io/v3/0b64da45811948f29371bbb854253dd5`
      "https://arbitrum-goerli.infura.io/v3/0b64da45811948f29371bbb854253dd5"
    ),
  });
  return client;
};

export const getWalletProvider = (chainName: string) => {
  const client = createWalletClient({
    chain: getChain(chainName),
    transport: custom(ethereum),
  });
  return client;
};

type ReadContract = {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  chainName: string;
};

export const readContract = ({
  address,
  abi,
  functionName,
  args,
  chainName,
}: ReadContract) => {
  const client = getPublicProvider(chainName);
  return client.readContract({
    address: address,
    abi: abi,
    functionName: functionName,
    args: args,
  });
};

type WriteContract = {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  chainName: string;
  wallet: any;
  account: any;
  value?: bigint;
};

export const writeContract = async ({
  address,
  abi,
  functionName,
  args,
  chainName,
  account,
  value,
}: WriteContract) => {
  const client = getWalletProvider(chainName);
  const request = await client.writeContract({
    address: address,
    abi: abi,
    functionName: functionName,
    args: args,
    account: account,
    ...(value && { value: value }),
  });

  return request;
};

export const isValidAddress = (address: string) => {
  return isAddress(address);
};

type TransferMyToken = {
  value: bigint;
  nft: string;
  tokenId: string;
  destinationChain: string;
};

export const TransferMyToken = async ({
  value,
  nft,
  tokenId,
  destinationChain,
}: TransferMyToken) => {
  try {
    const wallet = getWalletProvider(CHAINS_MAP.ARBITRUM_GOERLI);
    const [account] = await wallet.getAddresses();
    const req = await writeContract({
      address: BRIDGE_ADDRESS,
      abi: BRIDGE_ABI,
      functionName: "transferMyToken",
      args: [nft, tokenId, destinationChain],
      chainName: CHAINS_MAP.ARBITRUM_GOERLI,
      account: account,
      wallet: wallet,
      value: value,
    });
    console.log(req);
    return req;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type CreateBaseURINFT = {
  nft: string;
  baseURI: string;
  suffix: string;
  offset: number;
  baseZero: boolean;
  destinationChain: string;
  value: bigint;
};

export const createBaseURINFT = async ({
  nft,
  baseURI,
  suffix,
  offset,
  baseZero,
  destinationChain,
  value,
}: CreateBaseURINFT) => {
  try {
    const wallet = getWalletProvider(CHAINS_MAP.ARBITRUM_GOERLI);
    const [account] = await wallet.getAddresses();
    const req = await writeContract({
      address: BRIDGE_ADDRESS,
      abi: BRIDGE_ABI,
      functionName: "createBaseURIToken",
      args: [nft, baseURI, suffix, offset, baseZero, destinationChain],
      chainName: CHAINS_MAP.ARBITRUM_GOERLI,
      account: account,
      wallet: wallet,
      value: value,
    });
    console.log(req);
    return req;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type EstimateCostForCreateIndividualURIBasedToken = {
  nft: string;
  destinationChain: string;
};

export const estimateCostForCreateIndividualURIBasedToken = async ({
  nft,
  destinationChain,
}: EstimateCostForCreateIndividualURIBasedToken) => {
  try {
    const wallet = getWalletProvider(CHAINS_MAP.ARBITRUM_GOERLI);
    const [account] = await wallet.getAddresses();

    const req = await readContract({
      address: BRIDGE_ADDRESS,
      abi: BRIDGE_ABI,
      functionName: "estimateCostForCreateIndividualURIBasedToken",
      args: [nft, destinationChain],
      chainName: CHAINS_MAP.ARBITRUM_GOERLI,
    });

    console.log(req);
    return req;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type CreateIndividualURINFT = {
  nft: string;
  destinationChain: string;
  value: bigint;
};

export const createIndividualURINFT = async ({
  nft,
  destinationChain,
  value,
}: CreateIndividualURINFT) => {
  try {
    const wallet = getWalletProvider(CHAINS_MAP.ARBITRUM_GOERLI);
    const [account] = await wallet.getAddresses();

    const req = await writeContract({
      address: BRIDGE_ADDRESS,
      abi: BRIDGE_ABI,
      functionName: "createIndividualURIBasedToken",
      args: [nft, destinationChain],
      chainName: CHAINS_MAP.ARBITRUM_GOERLI,
      account: account,
      wallet: wallet,
      value: value,
    });

    console.log(req);
    return req;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type EstimateCostForCreateBaseURIToken = {
  nft: string;
  destinationChain: string;
  baseURI: string;
  suffix: string;
  offset: number;
  baseZero: boolean;
};

export const estimateCostForCreateBaseURIToken = async ({
  nft,
  destinationChain,
  baseURI,
  suffix,
  offset,
  baseZero,
}: EstimateCostForCreateBaseURIToken) => {
  try {
    const wallet = getWalletProvider(CHAINS_MAP.ARBITRUM_GOERLI);
    const [account] = await wallet.getAddresses();

    const req = await readContract({
      address: BRIDGE_ADDRESS,
      abi: BRIDGE_ABI,
      functionName: "estimateCostForCreateBaseURIToken",
      args: [nft, destinationChain, baseURI, suffix, offset, baseZero],
      chainName: CHAINS_MAP.ARBITRUM_GOERLI,
    });

    console.log(req);
    return req;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
