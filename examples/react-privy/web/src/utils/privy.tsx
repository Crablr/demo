"use client";

import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { PrivyProvider } from "@privy-io/react-auth";
import { env } from "./env";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <PrivyProvider
    appId={env.PRIVY_APP_ID}
    clientId={env.PRIVY_CLIENT_ID}
    config={{
      embeddedWallets: {
        ethereum: {
          createOnLogin: "all-users",
        },
        solana: {
          createOnLogin: "all-users",
        },
      },
      solana: {
        rpcs: {
          "solana:mainnet": {
            rpc: createSolanaRpc("https://api.mainnet-beta.solana.com"),
            rpcSubscriptions: createSolanaRpcSubscriptions(
              "wss://api.mainnet-beta.solana.com",
            ),
          },
          "solana:devnet": {
            rpc: createSolanaRpc("https://api.devnet.solana.com"),
            rpcSubscriptions: createSolanaRpcSubscriptions(
              "wss://api.devnet.solana.com",
            ),
          },
        },
      },
    }}
  >
    {children}
  </PrivyProvider>
);
