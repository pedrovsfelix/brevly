import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { desc } from "drizzle-orm";

type GetLinkBody = {
  originalUrl: string;
  code?: string;
}

export async function getLinks(app: FastifyInstance) {
    app.get('/links', async (req: FastifyRequest<{ Body: GetLinkBody }>, res: FastifyReply) => {
        const allLinks = await db
            .select()
            .from(links)
            .orderBy(desc(links.createdAt));

        return res.send({
            links: allLinks,
        });
        
    });
}