import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const polls = sqliteTable('polls', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  createdAt: text('created_at').notNull(),
});

export const pollOptions = sqliteTable('poll_options', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pollId: integer('poll_id').notNull().references(() => polls.id),
  label: text('label').notNull(),
  displayOrder: integer('display_order').notNull(),
});

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pollId: integer('poll_id').notNull().references(() => polls.id),
  optionId: integer('option_id').notNull().references(() => pollOptions.id),
  walletAddress: text('wallet_address').notNull(),
  votedAt: text('voted_at').notNull(),
}, (table) => ({
  uniqueVote: {
    name: 'unique_poll_wallet',
    columns: [table.pollId, table.walletAddress],
  },
}));