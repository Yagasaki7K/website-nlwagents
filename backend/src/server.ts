import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env";
import { getRoomsRoute } from "./http/routes/getRooms";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "https://localhost:3000",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", async () => {
	return { status: "ok" };
});

app.register(getRoomsRoute, { prefix: "/rooms" });

app.listen({ port: env.PORT }).then(() => {
	console.log(
		`Server is running at http://localhost in PORT: ${process.env.PORT ?? 3333}`,
	);
});
