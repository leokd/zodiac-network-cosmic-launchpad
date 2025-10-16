'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ZodiacCardProps {
  name: string;
  symbol: string;
  icon?: string;
  token: string;
  dates: string;
  ca: string;
  index: number;
}

export default function ZodiacCard({ name, symbol, icon, token, dates, ca, index }: ZodiacCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = () => {
    const url = "https://pump.fun/profile/imdevreal?tab=coins";
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*");
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative p-6 rounded-2xl border-2 border-primary/40 bg-card/50 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,150,0.25)] hover:border-primary hover:bg-card/80 hover:shadow-[0_0_35px_rgba(0,255,150,0.5)] transition-all duration-300">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          {icon ? (
            <img 
              src={icon} 
              alt={name} 
              className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(0,255,150,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,150,0.6)] transition-all duration-300"
            />
          ) : (
            <div className="text-6xl text-primary glow-text">
              {symbol}
            </div>
          )}
        </div>

        {/* Token */}
        <div className="text-center mb-2">
          <p className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">{token}</p>
        </div>

        {/* Dates */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{dates}</p>
        </div>

        {/* Decorative corner accents - now visible by default */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 group-hover:border-primary rounded-tl-2xl transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 group-hover:border-primary rounded-br-2xl transition-all duration-300" />
      </div>
    </motion.div>
  );
}