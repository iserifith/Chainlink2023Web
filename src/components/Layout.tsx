import Head from "next/head";
import React, { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isConnected } = useAccount();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Cross chain NFT Bridge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center py-4">
          <h1
            onClick={() => {
              router.push("/");
            }}
            className="text-3xl font-bold cursor-pointer"
          >
            Cross chain NFT Bridge
          </h1>
          <nav className="flex justify-between items-center">
            <div>
              <ConnectButton />
            </div>
          </nav>
        </header>

        <main className="my-4">{children}</main>
      </div>
    </>
  );
};

export default Layout;
