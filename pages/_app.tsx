import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  goerli,
  mainnet,
  polygon,
  base,
  sepolia,
  polygonMumbai,
  arbitrumGoerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { WALLET_CONNECT_PROJECT_ID } from "../src/utils/commons";
import Layout from "../src/components/Layout";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, base, goerli, sepolia, polygonMumbai, arbitrumGoerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "NFT Bridge",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
