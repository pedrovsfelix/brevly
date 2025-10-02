import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

import logoicon from "../../../public/Logo_Icon.svg";

export function Redirect() {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();

    const { isError } = useQuery({
        queryKey: ['redirect', code],
        queryFn: async () => {
            const res = await api.get(`/${code}`);
            return res.data;
        },
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            navigate('/not-found');
        }
    }, [ isError, navigate ]);

    return (
        <>
            <div className="h-[100dvh] w-full flex items-center justify-center bg-gray-200">
                <div className="flex flex-col items-center justify-center text-center gap-6 bg-white rounded-lg w-[580px] h-[329px] mx-6">
                    <img className="max-w-[192px] max-h-[85px] select-none" src={logoicon} alt="Page not found" />
                    <h1 className="text-gray-600 text-xl font-bold">Redirecionando...</h1>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500 text-md font-semibold flex-wrap max-w-[464px]">O link será aberto automaticamente em alguns instantes.</p>
                        <p className="text-gray-500 text-md font-semibold flex-wrap max-w-[464px]">Não foi redirecionado? <span className="text-primary">Acesse aqui</span></p>
                    </div>
                </div>
            </div>
        </>
    );
}