import fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./env";

import { createLink } from "./http/routes/createLink";
import { redirectLink } from "./http/routes/redirectLink";
import { getLinks } from "./http/routes/getLinks";
import { deleteLink } from "./http/routes/deleteLink";

const app = fastify();

app.register(cors, {
    origin: '*',
});

app.register(getLinks);
app.register(createLink);
app.register(deleteLink);
app.register(redirectLink);

const start = async () => {
    try {
        await app.listen({ port: env.PORT, host: '0.0.0.0' });
        console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();