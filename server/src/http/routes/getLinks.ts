import { FastifyInstance } from "fastify";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { desc } from "drizzle-orm";

export async function getLinks(app: FastifyInstance) {
    app.get('/links', async (req, res) => {
        const allLinks = await db
            .select()
            .from(links)
            .orderBy(desc(links.createdAt));

        return res.send({
            links: allLinks,
        });
        
    });
}