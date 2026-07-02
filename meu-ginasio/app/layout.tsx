import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'GymPro | O Teu Ginásio',
    description: 'Supera os teus limites com a nossa equipa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt" className="scroll-smooth">
        <body className={inter.className}>
        <header className="bg-zinc-950 text-white py-4 px-6 md:px-10 shadow-md sticky top-0 z-50 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-3xl font-black tracking-tighter flex items-center">
                    GYM<span className="text-blue-500">PRO</span>
                </Link>

                <nav className="flex items-center gap-6 md:gap-8 text-sm font-semibold text-zinc-300">
                    <Link href="/" className="hover:text-white transition-colors hidden md:block">Início</Link>
                    <Link href="/equipa" className="hover:text-white transition-colors hidden md:block">A Equipa</Link>
                    <Link href="/horarios" className="hover:text-white transition-colors">Horários</Link>
                    <Link href="/planos" className="hover:text-white transition-colors hidden md:block">Planos</Link>

                    <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-500 transition-colors shadow-sm ml-2">
                        Área de Cliente
                    </Link>
                </nav>
            </div>
        </header>
        {children}
        </body>
        </html>
    );
}