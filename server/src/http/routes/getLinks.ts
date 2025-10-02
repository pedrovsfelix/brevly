import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db/connection.js";
import { links } from "../../db/schema.js";
import { desc } from "drizzle-orm";

export async function getLinks(app: FastifyInstance) {
    app.get('/links', async (req: FastifyRequest, res: FastifyReply) => {
        const allLinks = await db
            .select()
            .from(links)
            .orderBy(desc(links.createdAt));

        return res.send({
            links: allLinks,
        });
        
    });
}