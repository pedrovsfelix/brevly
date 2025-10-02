import logo from "../../public/Logo.svg"

export function Header() {
    return (
        <>
            <header className="flex justify-center items-center md:justify-start w-full">
                <img className="md:max-w-[96px] md:max-h-[24px]" src={logo} alt="Logo brev.ly"/>
            </header>
        </>
    );
}