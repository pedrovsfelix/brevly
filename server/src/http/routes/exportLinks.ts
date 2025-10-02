import { FastifyInstance } from "fastify";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import Papa from "papaparse";
import { r2 } from "../../lib/cloudflare";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../../env";
import { randomUUID } from "node:crypto";

export async function exportLinks(app: FastifyInstance) {
    app.post('/reports/links', async (req, res) => {
        const allLinks = await db.select().from(links);

        if( allLinks.length === 0 ){
            return res.status(400).send({ message: 'No links to export.' });
        }

        const formattedData = allLinks.map((link) => {
            const fe = 'brev.ly';

            return {
                'URL Original': link.originalUrl,
                'URL Encurtado': `${fe}/${link.code}`,
                'Contagem de Acessos': link.accessCount,
                'Data de Criação': link.createdAt.toLocaleDateString('pt-BR'),
            };
        });

        const csvString = Papa.unparse(formattedData);

        const fileName = `${new Date().toISOString().split('T')[0]}-${randomUUID()}.csv`;

        try {
            const uploadCommand = new PutObjectCommand({
                Bucket: env.CLOUDFLARE_BUCKET,
                Key: fileName,
                Body: csvString,
                ContentType: 'text/csv',
            });

            await r2.send(uploadCommand);
        } catch (error) {
            console.error('Failed to upload to R2:', error);
            return res.status(500).send({ message: 'Failed to upload report.' });
        }

        const reportUrl = new URL(fileName, env.CLOUDFLARE_PUBLIC_URL).toString();

        return res.status(201).send({ reportUrl });

    })
}