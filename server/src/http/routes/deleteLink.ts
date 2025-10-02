import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { sql } from "drizzle-orm";

type DeleteLinkBody = {
  originalUrl: string;
  code?: string;
}

export async function deleteLink(app: FastifyInstance) {
    app.delete('/links/:id', async (req: FastifyRequest<{ Body: DeleteLinkBody }>, res: FastifyReply) => {
        const deleteLinkSchema = z.object({
            id: z.coerce.number().int().positive(),
        });

        const { id } = deleteLinkSchema.parse(req.params);

        const [ deleteLink ] = await db
            .delete(links)
            .where(sql`id = ${id}`)
            .returning({
                id: links.id,
            });

        if(!deleteLink) {
            return res.status(404).send({ message: 'Link not found!'});
        }

        return res.status(204).send();
    });
}