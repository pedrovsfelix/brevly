import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection.js";
import { links } from "../../db/schema.js";
import { sql } from "drizzle-orm";

type DeleteLinkParams = {
  id: number;
}

export async function deleteLink(app: FastifyInstance) {
    app.delete('/links/:id', async (req: FastifyRequest<{ Params: DeleteLinkParams }>, res: FastifyReply) => {
        const deleteLinkSchema = z.object({
            id: z.coerce.number().int().positive(),
        });

        const { id } = deleteLinkSchema.parse(req.params);

        const [ deletedLink ] = await db
            .delete(links)
            .where(sql`id = ${id}`)
            .returning({
                id: links.id,
            });

        if(!deletedLink) {
            return res.status(404).send({ message: 'Link not found!'});
        }

        return res.status(204).send();
    });
}