import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
    origin: '*',
});

app.get('/', async () => {
    return { hello: 'Brev.ly API' };
});

const start = async () => {
    try {
        await app.listen({ port: 3333 });
        console.log(`🚀 HTTP Server is running in http://localhost:3333`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();