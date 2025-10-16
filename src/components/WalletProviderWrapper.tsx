'use client';

import { useEffect } from 'react';
import { WalletProvider } from '@/contexts/WalletContext';

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically import wallet adapter styles on client side only
    import('@solana/wallet-adapter-react-ui/styles.css');
  }, []);

  return <WalletProvider>{children}</WalletProvider>;
}