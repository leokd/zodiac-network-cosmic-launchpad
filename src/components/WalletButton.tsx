'use client';

import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

export default function WalletButton() {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const handleClick = async () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`
        relative overflow-hidden font-semibold
        bg-gradient-to-r from-primary/20 to-primary/10 
        border-2 border-primary/50 
        hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,150,0.5)]
        transition-all duration-300
        ${isConnected ? 'text-primary' : 'text-primary'}
      `}
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnected ? `${address.slice(0, 5)}...${address.slice(-4)}` : 'Connect Wallet'}
    </Button>
  );
}