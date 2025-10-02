import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

const createLinkSchema = z.object({
    originalUrl: z.string().url('Por favor, insira uma URL válida.'),
    code: z.string().min(3, 'O código deve ter no mínimo 3 caracateres').optional().or(z.literal('')),
});

type CreateLinkData = z.infer<typeof createLinkSchema>;

export function Sidebar() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateLinkData>({
        resolver: zodResolver(createLinkSchema),
    });

    const { mutate: createLink, isPending } = useMutation({
        mutationFn: async (data: CreateLinkData) => {
            await api.post('/links', {
                originalUrl: data.originalUrl,
                code: data.code || undefined,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
            reset();
        },
    });

    const handleCreateLink = (data: CreateLinkData) => {
        createLink(data);
    };

    return (

        <form onSubmit={handleSubmit(handleCreateLink)} className="w-full">
        <div className="bg-white rounded-lg flex flex-col gap-6 p-8">
            <h1 className="text-gray-600 text-lg font-bold">
                Novo link
            </h1>

            <div className="w-full flex flex-col gap-1">
                {/* CORREÇÃO: htmlFor agora corresponde ao nome do campo */}
                <label className="text-gray-500 text-xs" htmlFor="originalUrl">
                    link original
                </label>
                {/* CORREÇÃO: Removido o 'name' manual e adicionado o 'id' */}
                <input 
                    {...register('originalUrl')} 
                    id="originalUrl"
                    className="border border-gray-300 text-gray-600 text-md rounded-lg h-[48px] p-3" 
                    type="text" 
                    alt="link original" 
                    aria-label="www.exemplo.com.br"
                    placeholder="https://www.exemplo.com.br"
                />
                {errors.originalUrl && <span className="text-red-500 text-sm mt-1">{errors.originalUrl.message}</span>}
            </div>

            <div className="w-full flex flex-col gap-1">
                {/* CORREÇÃO: htmlFor agora corresponde ao nome do campo */}
                <label className="text-gray-500 text-xs" htmlFor="code">
                    link encurtado (opcional)
                </label>
                {/* CORREÇÃO: Removido o 'name' manual e adicionado o 'id' */}
                <input 
                    {...register('code')}
                    id="code"
                    className="border border-gray-300 text-gray-600 text-md rounded-lg h-[48px] p-3" 
                    type="text" 
                    alt="Link encurtado" 
                    aria-label="brev.ly/"
                    placeholder="meu-link-customizado"
                />
                {errors.code && <span className="text-red-500 text-sm mt-1">{errors.code.message}</span>}
            </div>

            <button type="submit" disabled={isPending} className="bg-primary text-white rounded-lg p-3 hover:bg-primary-dark disabled:bg-opacity-60">
                {isPending ? 'Salvando link...' : 'Salvar link'}
            </button>
        </div>
    </form>

    );
}