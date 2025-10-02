import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { LinkItem } from "./LinkItem";

interface Link {
    id: number;
    code: string;
    originalUrl: string;
    accessCount: number;
}

export function Card() {

    const queryClient = useQueryClient();
    const baseUrl = import.meta.env.BASE_URL || 'http://localhost:5173';

    const { data: links, isLoading } = useQuery<Link[]>({
        queryKey: ['links'],
        queryFn: async () => {
            const res = await api.get('links');
            return res.data.links;
        },
    });

    const { mutate: deleteLink } = useMutation({
        mutationFn: async (linkId: number) => {
            await api.delete(`/links/${linkId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        }
    });

    const { mutate: downloadCsv } = useMutation({
        mutationFn: async () => {
            const res = await api.post('/reports/links');
            return res.data;
        },
        onSuccess: (data) => {
            window.open(data.reportUrl, '_blank');
        }
    });

    return (
        <div className="bg-white flex flex-col w-full md:min-h-[234px] gap-5">
            <div className="flex flex-row justify-between w-full">
                <h2 className="font-bold text-lg">Meus links</h2>
                <button onClick={ () => downloadCsv() } type="button" className="flex items-center justify-center gap-1 text-sm">
                    <DownloadSimpleIcon size={12} />
                    Baixar CSV
                </button>
            </div>
            
            {/* Div quando não tiver itens cadastrados */}
            <div className="border-t border-gray-200 h-full flex flex-col items-center justify-between bg-red-50">
                
            </div>

            {/* Div quando tiver itens cadastrados */}
            <div className="border-t border-gray-200 flex flex-col">

                {isLoading ? (
                    <p>Carregando dados ...</p>
                ) : links && links.length > 0 ? (
                    links.map((link) => (
                        <LinkItem
                            key={link.id}
                            shortUrl={`${baseUrl}${link.code}`}
                            originalUrl={link.originalUrl}
                            accessCount={link.accessCount}
                            onDelete={() => deleteLink(link.id)}
                        />
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4 py-10">
                        <LinkIcon size={32} />
                        <h3 className="uppercase text-gray-500 text-xs">ainda não existe links cadastrados</h3>
                    </div>
                )}
    
            </div>
        </div>
    );
}
