import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { polls, pollOptions, votes } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = parseInt(params.id);
    
    if (!pollId || isNaN(pollId)) {
      return NextResponse.json(
        { error: 'Valid poll ID is required', code: 'INVALID_POLL_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { optionId, walletAddress } = body;

    if (!optionId || !walletAddress) {
      return NextResponse.json(
        { error: 'optionId and walletAddress are required', code: 'MISSING_REQUIRED_FIELDS' },
        { status: 400 }
      );
    }

    const normalizedWalletAddress = walletAddress.toLowerCase().trim();

    const existingVote = await db
      .select()
      .from(votes)
      .where(
        and(
          eq(votes.pollId, pollId),
          eq(votes.walletAddress, normalizedWalletAddress)
        )
      )
      .limit(1);

    if (existingVote.length > 0) {
      return NextResponse.json(
        { error: 'This wallet has already voted on this poll', code: 'DUPLICATE_VOTE' },
        { status: 400 }
      );
    }

    const poll = await db
      .select()
      .from(polls)
      .where(eq(polls.id, pollId))
      .limit(1);

    if (poll.length === 0) {
      return NextResponse.json(
        { error: 'Poll not found', code: 'POLL_NOT_FOUND' },
        { status: 404 }
      );
    }

    const option = await db
      .select()
      .from(pollOptions)
      .where(
        and(
          eq(pollOptions.id, parseInt(optionId)),
          eq(pollOptions.pollId, pollId)
        )
      )
      .limit(1);

    if (option.length === 0) {
      return NextResponse.json(
        { error: 'Invalid option for this poll', code: 'INVALID_OPTION' },
        { status: 404 }
      );
    }

    const newVote = await db
      .insert(votes)
      .values({
        pollId,
        optionId: parseInt(optionId),
        walletAddress: normalizedWalletAddress,
        votedAt: new Date().toISOString(),
      })
      .returning();

    const voteCounts = await db
      .select({
        optionId: votes.optionId,
        count: sql<number>`count(*)`.as('count'),
      })
      .from(votes)
      .where(eq(votes.pollId, pollId))
      .groupBy(votes.optionId);

    return NextResponse.json(
      {
        success: true,
        message: 'Vote recorded',
        pollId,
        optionId: parseInt(optionId),
        voteCounts,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}