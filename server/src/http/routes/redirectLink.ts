import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection.js";
import { links } from "../../db/schema.js";
import { sql } from "drizzle-orm";

type RedirectLinkParams = {
  code: string;
}

export async function redirectLink(app: FastifyInstance) {
    app.get('/:code', async (req: FastifyRequest<{ Params: RedirectLinkParams }>, res: FastifyReply) => {
        const getLinkSchema = z.object({
            code: z.string().min(3),
        });

        const { code } = getLinkSchema.parse(req.params);

        const [ link ] = await db
            .select({ originalUrl: links.originalUrl, id: links.id })
            .from(links)
            .where(sql`code = ${code}`);

        if(!link) {
            return res.status(404).send({ message: 'Link not found.' });
        }

        await db
            .update(links)
            .set({
                accessCount: sql`access_count + 1`,
            })
            .where(sql`id = ${link.id}`);

        return res.status(301).send(link.originalUrl);
    });
}