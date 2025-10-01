import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { sql } from "drizzle-orm";

export async function deleteLink(app: FastifyInstance) {
    app.delete('/links/:id', async (req, res) => {
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