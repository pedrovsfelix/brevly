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
    }

    return (
        <div className="border-b border-gray-200 flex justify-between items-center">
                <div className="md:max-w-[157px]">
                    <p className="text-primary text-md">{shortUrl.replace('http://', '')}</p>
                    <p className="text-gray-500 text-sm truncate">{originalUrl}</p>
                </div>

                <p className="text-gray-500 text-sm">{accessCount} acessos</p>

                <div className="flex gap-2">
                    <button onClick={handleCopyToClipboard} className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center">
                        <CopyIcon size={12} />
                    </button>
                    <button onClick={onDelete} className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center">
                        <TrashIcon size={12} />
                    </button>
                </div>
        </div>
    );
}