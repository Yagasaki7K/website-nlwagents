import { desc, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection";
import { schema } from "../../db/schema";

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
    app.get("/rooms/:roodId/questions", {
        schema: {
            params: z.object({
                roomId: z.string()
            })
        }
    }, async (req, res) => {
        const { roomId } = req.params

        const result = await db
            .select({
                id:schema.questions.id,
                questions:schema.questions.question,
                answer:schema.questions.answer,
                createdAt:schema.questions.createdAt,

            })
            .from(schema.questions)
            .where(eq(schema.questions.roomId, roomId))
            .orderBy(desc(schema.questions.createdAt))

    });
};
