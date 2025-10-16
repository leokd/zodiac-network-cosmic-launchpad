'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Vote, TrendingUp, Check } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface PollOption {
  id: number;
  label: string;
  displayOrder: number;
  voteCount: number;
}

interface Poll {
  id: number;
  question: string;
  createdAt: string;
  options: PollOption[];
}

export default function CommunityVoting() {
  const ref = useRef(null);
  const { isConnected, address } = useWallet();
  
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedPolls, setVotedPolls] = useState<Record<number, number>>({});
  const [voting, setVoting] = useState<number | null>(null);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await fetch('/api/polls');
      const data = await response.json();
      // Filter out the "What's your go-to morning vibe?" poll
      const filteredPolls = data.filter((poll: Poll) => 
        poll.question !== "What's your go-to morning vibe?"
      );
      setPolls(filteredPolls);
    } catch (error) {
      console.error('Failed to fetch polls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId: number, optionId: number) => {
    if (!isConnected || !address) {
      alert('Please connect your wallet to vote');
      return;
    }

    if (votedPolls[pollId]) {
      return;
    }

    setVoting(pollId);

    try {
      const response = await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optionId,
          walletAddress: address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVotedPolls(prev => ({ ...prev, [pollId]: optionId }));
        await fetchPolls();
      } else if (data.code === 'DUPLICATE_VOTE') {
        setVotedPolls(prev => ({ ...prev, [pollId]: optionId }));
      } else {
        alert(data.error || 'Failed to vote');
      }
    } catch (error) {
      console.error('Vote failed:', error);
      alert('Failed to submit vote');
    } finally {
      setVoting(null);
    }
  };

  const getPollPercentage = (poll: Poll, optionId: number) => {
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);
    const option = poll.options.find(opt => opt.id === optionId);
    if (!option || totalVotes === 0) return 0;
    return Math.round((option.voteCount / totalVotes) * 100);
  };

  if (loading) {
    return (
      <section className="relative py-24 px-4 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Loading polls...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
            Community Polls
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {polls.map((poll, pollIndex) => {
            const hasVoted = !!votedPolls[poll.id];
            const userVotedOptionId = votedPolls[poll.id];

            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: pollIndex * 0.2 }}
                className="p-8 rounded-2xl border-2 border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-6">
                  <Vote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold">{poll.question}</h3>
                </div>

                <div className="space-y-4 flex-1">
                  {poll.options.map((option) => {
                    const percentage = getPollPercentage(poll, option.id);
                    const isUserVote = userVotedOptionId === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVote(poll.id, option.id)}
                        disabled={hasVoted || voting === poll.id || !isConnected}
                        className="w-full group disabled:cursor-not-allowed"
                      >
                        <div className="relative p-4 rounded-xl border-2 border-border/30 bg-background/50 hover:border-primary/50 transition-all duration-300 disabled:opacity-50">
                          {/* Progress bar - only show if user has voted */}
                          {hasVoted && (
                            <div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          )}

                          {/* Content */}
                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isUserVote && (
                                <Check className="w-4 h-4 text-primary" />
                              )}
                              {!isUserVote && <TrendingUp className="w-4 h-4 text-primary" />}
                              <span className="font-medium">{option.label}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              {hasVoted && (
                                <>
                                  <span className="text-sm text-muted-foreground">
                                    {option.voteCount} votes
                                  </span>
                                  <span className="text-lg font-bold text-primary">
                                    {percentage}%
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {!hasVoted && (
                  <div className="mt-6 p-4 rounded-xl border border-primary/30 bg-primary/5">
                    <p className="text-sm text-center text-muted-foreground">
                      {isConnected 
                        ? voting === poll.id 
                          ? 'Submitting vote...' 
                          : 'Click an option to vote'
                        : 'Connect Wallet'}
                    </p>
                  </div>
                )}

                {hasVoted && (
                  <div className="mt-6 p-4 rounded-xl border border-primary/50 bg-primary/10">
                    <p className="text-sm text-center text-primary font-medium">
                      ✓ You have voted on this poll
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}