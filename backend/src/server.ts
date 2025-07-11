import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env";
import { getRoomsRoute } from "./http/routes/getRooms";
import { createRoomRoute } from "./http/routes/createRooms";
import { getRoomQuestions } from "./http/routes/getRoomQuestions";
import { createQuestionRoute } from "./http/routes/createQuestion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "https://localhost:3000",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", async () => {
	return { status: "ok" };
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestions);
app.register(createQuestionRoute);

app.listen({ port: env.PORT }).then(() => {
	console.log(
		`Server is running at http://localhost in PORT: ${process.env.PORT ?? 3333}`,
	);
});
