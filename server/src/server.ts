import fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./env";

import { createLink } from "./http/routes/createLink";
import { redirectLink } from "./http/routes/redirectLink";
import { getLinks } from "./http/routes/getLinks";
import { deleteLink } from "./http/routes/deleteLink";
import { exportLinks } from "./http/routes/exportLinks";

const app = fastify();

const corsOrigin = env.FRONTEND_URL || '*';

app.register(cors, {
    origin: corsOrigin,
});

app.register(getLinks);
app.register(createLink);
app.register(deleteLink);
app.register(redirectLink);
app.register(exportLinks);

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