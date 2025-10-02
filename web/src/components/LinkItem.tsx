import { CopyIcon, TrashIcon } from "@phosphor-icons/react";

interface LinkItemProps {
    shortUrl: string;
    originalUrl: string;
    accessCount: number;
    onDelete: () => void;
}

export function LinkItem({ shortUrl, originalUrl, accessCount, onDelete }: LinkItemProps) {
    
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        // Dica: Adicione um feedback visual para o usuário, como um toast "Link copiado!".
    }

    return (
        <div className="border-b border-gray-200 flex justify-between items-center py-4">
            <div className="flex flex-col gap-1 md:max-w-[250px]">
                {/* <-- MUDANÇA PRINCIPAL: <p> foi trocado por <a> --> */}
                <a 
                    href={shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-md font-bold hover:underline"
                >
                    {/* Expressão regular para remover http:// ou https:// */}
                    {shortUrl.replace(/^https?:\/\//, '')}
                </a>
                <p className="text-gray-500 text-sm truncate">{originalUrl}</p>
            </div>

            <p className="text-gray-500 text-sm">{accessCount} acessos</p>

            <div className="flex gap-2">
                <button onClick={handleCopyToClipboard} className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center hover:bg-gray-300">
                    <CopyIcon size={16} />
                </button>
                <button onClick={onDelete} className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center hover:bg-red-100">
                    <TrashIcon size={16} className="text-red-500" />
                </button>
            </div>
        </div>
    );
}