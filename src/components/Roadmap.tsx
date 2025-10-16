'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Rocket, Users, Coins, Globe } from 'lucide-react';

export default function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const roadmapItems = [
    {
      phase: 'Phase 1',
      title: 'Launch',
      status: 'current',
      icon: Rocket,
      items: ['Token Creation', 'Website Launch', 'Community Building'],
    },
    {
      phase: 'Phase 2',
      title: 'Growth',
      status: 'upcoming',
      icon: Users,
      items: ['DEX Listing', 'Partnerships', 'Marketing Campaign'],
    },
    {
      phase: 'Phase 3',
      title: 'Expansion',
      status: 'upcoming',
      icon: Coins,
      items: ['NFT Collection', 'Staking Platform', 'Governance Launch'],
    },
    {
      phase: 'Phase 4',
      title: 'Global',
      status: 'upcoming',
      icon: Globe,
      items: ['CEX Listings', 'Mobile App', 'Metaverse Integration'],
    },
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 cosmic-gradient" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold glow-text">
            Roadmap
          </h2>
        </motion.div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-4 gap-8">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon;
              const isCompleted = item.status === 'completed';
              const isCurrent = item.status === 'current';

              return (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Checkpoint */}
                  <div className="flex justify-center mb-8 relative">
                    <div
                      className={`
                        relative w-20 h-20 rounded-full border-4 
                        flex items-center justify-center z-10
                        transition-all duration-500
                        ${isCompleted 
                          ? 'bg-primary border-primary shadow-[0_0_30px_rgba(0,255,150,0.6)]' 
                          : isCurrent
                          ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(0,255,150,0.4)] animate-pulse'
                          : 'bg-card border-border/50'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="w-10 h-10 text-background" />
                      ) : (
                        <Icon
                          className={`w-10 h-10 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                      )}

                      {/* Glowing ring for current phase */}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Connecting line to next checkpoint */}
                    {index < roadmapItems.length - 1 && (
                      <div className="absolute left-[calc(50%+40px)] top-1/2 w-[calc(100%+2rem)] h-1 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/30 -translate-y-1/2 shadow-[0_0_10px_rgba(0,255,150,0.4)]" />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`
                      p-6 rounded-2xl border-2 backdrop-blur-xl
                      transition-all duration-500
                      ${isCompleted || isCurrent
                        ? 'border-primary/50 bg-gradient-to-b from-card/90 to-card/70 shadow-[0_0_20px_rgba(0,255,150,0.2)]'
                        : 'border-border/30 bg-card/50'
                      }
                    `}
                  >
                    <div className="text-xs font-mono text-primary mb-2">
                      {item.phase}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.items.map((task, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">▸</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {roadmapItems.map((item, index) => {
            const Icon = item.icon;
            const isCompleted = item.status === 'completed';
            const isCurrent = item.status === 'current';

            return (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex gap-4"
              >
                {/* Checkpoint */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-16 h-16 rounded-full border-4 
                      flex items-center justify-center flex-shrink-0
                      ${isCompleted 
                        ? 'bg-primary border-primary shadow-[0_0_20px_rgba(0,255,150,0.6)]' 
                        : isCurrent
                        ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(0,255,150,0.4)] animate-pulse'
                        : 'bg-card border-border/50'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-8 h-8 text-background" />
                    ) : (
                      <Icon
                        className={`w-8 h-8 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                    )}
                  </div>
                  {index < roadmapItems.length - 1 && (
                    <div className="w-1 flex-1 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/30 min-h-[60px] shadow-[0_0_8px_rgba(0,255,150,0.4)]" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`
                    flex-1 p-6 rounded-2xl border-2 backdrop-blur-xl
                    ${isCompleted || isCurrent
                      ? 'border-primary/50 bg-gradient-to-b from-card/90 to-card/70'
                      : 'border-border/30 bg-card/50'
                    }
                  `}
                >
                  <div className="text-xs font-mono text-primary mb-2">
                    {item.phase}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((task, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">▸</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}