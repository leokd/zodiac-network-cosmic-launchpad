'use client';

import { motion } from 'framer-motion';
import CosmicBackground from '@/components/CosmicBackground';
import ZodiacCard from '@/components/ZodiacCard';
import WalletButton from '@/components/WalletButton';
import Tokenomics from '@/components/Tokenomics';
import Roadmap from '@/components/Roadmap';
import CommunityVoting from '@/components/CommunityVoting';

export default function Home() {
  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-11-1760465215753.png', token: '$ARIES', dates: 'Mar 21 - Apr 19', ca: 'Arie5...x7Ym' },
    { name: 'Taurus', symbol: '♉', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-1760465218673.png', token: '$TAURUS', dates: 'Apr 20 - May 20', ca: 'Taur8...k9Pq' },
    { name: 'Gemini', symbol: '♊', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-3-1760465250909.png', token: '$GEMINI', dates: 'May 21 - Jun 20', ca: 'Gemi3...m2Lx' },
    { name: 'Cancer', symbol: '♋', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-5-1760465240938.png', token: '$CANCER', dates: 'Jun 21 - Jul 22', ca: 'Canc6...n4Wz' },
    { name: 'Leo', symbol: '♌', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-6-1760465253216.png', token: '$LEO', dates: 'Jul 23 - Aug 22', ca: 'Leo9...p7Rt' },
    { name: 'Virgo', symbol: '♍', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-12-1760465245517.png', token: '$VIRGO', dates: 'Aug 23 - Sep 22', ca: 'Virg2...q8Sx' },
    { name: 'Libra', symbol: '♎', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-2-1760465471564.png', token: '$LIBRA', dates: 'Sep 23 - Oct 22', ca: 'Libr5...r3Ty' },
    { name: 'Scorpio', symbol: '♏', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-8-1760465476978.png', token: '$SCORPIO', dates: 'Oct 23 - Nov 21', ca: 'Scor7...s6Uv' },
    { name: 'Sagittarius', symbol: '♐', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-9-1760465480095.png', token: '$SAGITTARIUS', dates: 'Nov 22 - Dec 21', ca: 'Sagi1...t9Wx' },
    { name: 'Capricorn', symbol: '♑', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-7-1760465485130.png', token: '$CAPRICORN', dates: 'Dec 22 - Jan 19', ca: 'Capr4...u2Yz' },
    { name: 'Aquarius', symbol: '♒', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-1-1760465495262.png', token: '$AQUARIUS', dates: 'Jan 20 - Feb 18', ca: 'Aqua8...v5Ab' },
    { name: 'Pisces', symbol: '♓', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Untitled-design-4-1760465490802.png', token: '$PISCES', dates: 'Feb 19 - Mar 20', ca: 'Pisc3...w8Cd' },
  ];

  const handleExternalLink = (url: string) => {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*");
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CosmicBackground />

      {/* Header */}
      <header className="relative z-50 border-b border-border/30 backdrop-blur-xl bg-background/50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold glow-text"
          >
            Zodiac Network
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <WalletButton />
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Zodiac Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {zodiacSigns.map((sign, index) => (
              <ZodiacCard
                key={sign.name}
                name={sign.name}
                symbol={sign.symbol}
                icon={sign.icon}
                token={sign.token}
                dates={sign.dates}
                ca={sign.ca}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <Tokenomics />

      {/* Roadmap Section */}
      <Roadmap />

      {/* Community Voting Section */}
      <CommunityVoting />

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 backdrop-blur-xl bg-background/50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-6">Zodiac Network</h3>
          
          <div className="flex justify-center gap-8 mb-6">
            <button
              onClick={() => handleExternalLink("https://x.com/pumpzodiacfun")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              X
            </button>
            <button
              onClick={() => handleExternalLink("https://pump.fun/profile/imdevreal?tab=balances")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Pump.fun
            </button>
            <button
              onClick={() => handleExternalLink("https://t.me/+0Gjqug4i0bJjN2I0")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Telegram
            </button>
            <button
              onClick={() => handleExternalLink("https://discord.gg/VQU4hNgnXp")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Discord
            </button>
            <button
              onClick={() => handleExternalLink("https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Whitepaper-1760526319784.pdf")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Whitepaper
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2025 Zodiac Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}