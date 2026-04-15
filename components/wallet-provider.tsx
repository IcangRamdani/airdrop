'use client';

// Temporarily disabled wallet functionality for build
// TODO: Install @rainbow-me/rainbowkit and wagmi packages
// import '@rainbow-me/rainbowkit/styles.css';
// import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
// import { configureChains, createConfig, WagmiConfig } from 'wagmi';
// import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';

// const { chains, publicClient } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()]);

// const { connectors } = getDefaultWallets({
//   appName: 'DropHub',
//   projectId: 'drophub-project',
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    // Temporarily just render children without wallet functionality
    // TODO: Enable when wallet packages are installed
    // <WagmiConfig config={wagmiConfig}>
    //   <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
        {children}
    //   </RainbowKitProvider>
    // </WagmiConfig>
  );
}
