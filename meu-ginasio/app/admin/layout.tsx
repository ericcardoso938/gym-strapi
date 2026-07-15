"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Clientes", href: "/admin/clientes" },
    { label: "Planos", href: "/admin/planos" },
    { label: "Treinadores", href: "/admin/treinadores" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            router.push('/login');
            return;
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-950 text-white flex flex-col shrink-0">
                <div className="p-6 border-b border-zinc-800">
                    <Link href="/" className="text-2xl font-black tracking-tighter">
                        GYM<span className="text-blue-500">PRO</span>
                    </Link>
                    <p className="text-zinc-500 text-xs font-semibold mt-1 uppercase tracking-widest">Painel Admin</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <Link
                        href="/area-cliente"
                        className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-medium transition-colors"
                    >
                        ← Área de Cliente
                    </Link>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
