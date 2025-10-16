import { db } from '@/db';
import { polls, pollOptions } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date().toISOString();

    const samplePolls = [
        {
            question: 'Which features should we prioritize next?',
            createdAt: currentTimestamp,
        },
        {
            question: 'Which event should we host next month?',
            createdAt: currentTimestamp,
        },
        {
            question: 'Which community platform should we grow next?',
            createdAt: currentTimestamp,
        },
        {
            question: "What's your go-to morning vibe?",
            createdAt: currentTimestamp,
        },
    ];

    const insertedPolls = await db.insert(polls).values(samplePolls).returning();

    const samplePollOptions = [
        {
            pollId: insertedPolls[0].id,
            label: 'Staking Platform',
            displayOrder: 1,
        },
        {
            pollId: insertedPolls[0].id,
            label: 'NFT',
            displayOrder: 2,
        },
        {
            pollId: insertedPolls[0].id,
            label: 'Mobile App',
            displayOrder: 3,
        },
        {
            pollId: insertedPolls[1].id,
            label: 'Tribe Battle',
            displayOrder: 1,
        },
        {
            pollId: insertedPolls[1].id,
            label: 'Airdrop',
            displayOrder: 2,
        },
        {
            pollId: insertedPolls[1].id,
            label: 'Art Contest',
            displayOrder: 3,
        },
        {
            pollId: insertedPolls[2].id,
            label: 'Telegram',
            displayOrder: 1,
        },
        {
            pollId: insertedPolls[2].id,
            label: 'Discord',
            displayOrder: 2,
        },
        {
            pollId: insertedPolls[2].id,
            label: 'Reddit',
            displayOrder: 3,
        },
        {
            pollId: insertedPolls[3].id,
            label: 'Calm & Grounded',
            displayOrder: 1,
        },
        {
            pollId: insertedPolls[3].id,
            label: 'Chaotic but Creative',
            displayOrder: 2,
        },
        {
            pollId: insertedPolls[3].id,
            label: 'Silent until Caffeine',
            displayOrder: 3,
        },
    ];

    await db.insert(pollOptions).values(samplePollOptions);

    console.log('✅ Polls and poll options seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});