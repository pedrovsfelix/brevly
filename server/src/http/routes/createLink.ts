import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";

type CreateLinkBody = {
  originalUrl: string;
  code?: string;
}

export async function createLink(app: FastifyInstance) {
    app.post('/links', async (req: FastifyRequest<{ Body: CreateLinkBody }>, res: FastifyReply) => {
        const createLinkSchema = z.object({
            originalUrl: z.string().url(),
            code: z.string().min(3).optional(),
        });

        const { originalUrl, code: providedCode } = createLinkSchema.parse(req.body);
        let code = providedCode || nanoid(6);

        while(true) {
            const [ linkWithSameCode ] = await db.select().from(links).where(sql`code = ${code}`);
            if(!linkWithSameCode) break;
            code = nanoid(6);
        }

        const [ newLink ] = await db.insert(links).values({ originalUrl, code }).returning();

        return res.status(201).send({ linkId: newLink.id, code: newLink.code });
    });
}