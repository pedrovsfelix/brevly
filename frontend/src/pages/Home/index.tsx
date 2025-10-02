import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SIdebar";

export function Home() {
    return (
        <>
            <div className="h-[100dvh] flex flex-col items-center justify-center bg-gray-200">
                <div className="max-w-[1200px]">
                    <Header />
                    <div className="mt-3 flex flex-col items-center justify-center gap-6 md:flex md:flex-row md:gap-6 bg-white rounded-lg p-8">
                        <Sidebar />
                        <Card />
                    </div>
                </div>
            </div>
        </>
    );
}