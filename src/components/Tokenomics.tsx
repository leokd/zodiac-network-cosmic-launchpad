'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Tokenomics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const tokenomicsData = [
    { label: 'MC Balancing', percentage: 50, color: '#00ff96' },
    { label: 'Daily Giveaways', percentage: 20, color: '#00d4ff' },
    { label: 'Marketing & Collaborations', percentage: 20, color: '#a78bfa' },
    { label: 'Team (Ops & Growth)', percentage: 10, color: '#ffffff' },
  ];

  const tokens = [
    '$ARIES', '$TAURUS', '$GEMINI', '$CANCER',
    '$LEO', '$VIRGO', '$LIBRA', '$SCORPIO',
    '$SAGITTARIUS', '$CAPRICORN', '$AQUARIUS', '$PISCES'
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold glow-text">
            Tokenomics
          </h2>
        </motion.div>

        {/* Token Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Token Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Total Supply (each)</span>
                  <span className="font-bold font-mono">1,000,000,000</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-bold text-primary">0%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Ownership</span>
                  <span className="font-bold">Renounced</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Liquidity</span>
                  <span className="font-bold">Fully Locked</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-bold text-primary">Solana</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">12 Zodiac Tokens</h3>
              <div className="grid grid-cols-2 gap-2">
                {tokens.map((token, index) => (
                  <motion.div
                    key={token}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="p-2 rounded-lg bg-background/50 border border-primary/20 text-center font-mono text-sm hover:border-primary/50 transition-all"
                  >
                    {token}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Legend - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Creator Reward Distribution</h3>
            <div className="space-y-4">
              {tokenomicsData.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}`,
                      }}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.percentage}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Pie Chart - Right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="relative w-96 h-96 flex items-center justify-center">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/20 blur-xl" />
              
              {/* Pie chart SVG */}
              <svg viewBox="0 0 240 240" className="transform -rotate-90 w-80 h-80">
                <defs>
                  {/* Define gradients for each segment */}
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00ff96', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00cc78', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00a8cc', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#cccccc', stopOpacity: 1 }} />
                  </linearGradient>
                  
                  {/* Drop shadow filter */}
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="currentColor" floodOpacity="0.5"/>
                  </filter>
                </defs>

                {tokenomicsData.reduce((acc, item, index) => {
                  const prevPercentage = tokenomicsData
                    .slice(0, index)
                    .reduce((sum, i) => sum + i.percentage, 0);
                  const circumference = 2 * Math.PI * 90;
                  const offset = (prevPercentage / 100) * circumference;
                  const dashArray = `${(item.percentage / 100) * circumference} ${circumference}`;

                  acc.push(
                    <motion.circle
                      key={item.label}
                      cx="120"
                      cy="120"
                      r="90"
                      fill="none"
                      stroke={`url(#grad${index + 1})`}
                      strokeWidth="50"
                      strokeDasharray={dashArray}
                      strokeDashoffset={-offset}
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      animate={isInView ? { strokeDasharray: dashArray } : {}}
                      transition={{ duration: 1.2, delay: 0.7 + index * 0.15, ease: 'easeOut' }}
                      filter="url(#shadow)"
                      style={{ color: item.color }}
                      strokeLinecap="round"
                    />
                  );
                  return acc;
                }, [] as JSX.Element[])}
                
                {/* Center circle for donut effect */}
                <circle
                  cx="120"
                  cy="120"
                  r="65"
                  fill="oklch(0.08 0 0)"
                  className="drop-shadow-2xl"
                />
              </svg>
              
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-5xl font-bold glow-text">100%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}