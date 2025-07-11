import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { rooms } from "./rooms";

export const questions = pgTable("questions", {
    id: uuid().primaryKey().defaultRandom(),
    roomId: uuid().notNull().references(() => rooms.id),
    question: text().notNull(),
    answer: text(),
	createdAt: timestamp().defaultNow().notNull(),
});
