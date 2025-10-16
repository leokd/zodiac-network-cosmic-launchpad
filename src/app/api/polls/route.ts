import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { polls, pollOptions, votes } from '@/db/schema';
import { eq, asc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Fetch all polls ordered by id
    const allPolls = await db.select()
      .from(polls)
      .orderBy(asc(polls.id));

    // Build response with options and vote counts for each poll
    const pollsWithOptions = await Promise.all(
      allPolls.map(async (poll) => {
        // Fetch poll options with vote counts
        const options = await db.select({
          id: pollOptions.id,
          label: pollOptions.label,
          displayOrder: pollOptions.displayOrder,
          voteCount: sql<number>`CAST(COUNT(${votes.id}) AS INTEGER)`,
        })
          .from(pollOptions)
          .leftJoin(votes, eq(pollOptions.id, votes.optionId))
          .where(eq(pollOptions.pollId, poll.id))
          .groupBy(pollOptions.id, pollOptions.label, pollOptions.displayOrder)
          .orderBy(asc(pollOptions.displayOrder));

        return {
          id: poll.id,
          question: poll.question,
          createdAt: poll.createdAt,
          options: options.map(option => ({
            id: option.id,
            label: option.label,
            displayOrder: option.displayOrder,
            voteCount: option.voteCount || 0,
          })),
        };
      })
    );

    return NextResponse.json(pollsWithOptions, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}