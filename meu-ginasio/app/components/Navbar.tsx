import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex items-center gap-6 md:gap-8 text-sm font-semibold text-zinc-300">
            <Link href="/" className="hover:text-white transition-colors hidden md:block">Início</Link>
            <Link href="/equipa" className="hover:text-white transition-colors hidden md:block">A Equipa</Link>
            <Link href="/horarios" className="hover:text-white transition-colors">Horários</Link>
            <Link href="/planos" className="hover:text-white transition-colors hidden md:block">Planos</Link>
            <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-500 transition-colors shadow-sm ml-2">
                Área de Cliente
            </Link>
        </nav>
    );
}