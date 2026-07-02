"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchFromStrapi } from '../lib/api';

export default function AreaCliente() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const loadUserData = async () => {
            const token = localStorage.getItem('jwt');

            if (!token) {
                router.push('/login');
                return;
            }

            try {
                // Passamos o token aqui para o Strapi identificar o utilizador logado
                const userData = await fetchFromStrapi("users/me?populate=plano", token);
                console.log("RESPOSTA COMPLETA DO STRAPI:", userData);
                setUser(userData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                // Se der erro (ex: token inválido), força logout
                localStorage.removeItem('jwt');
                router.push('/login');
            }
        };

        loadUserData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (!user) return <div className="min-h-screen bg-zinc-50 flex items-center justify-center">A carregar...</div>;

    return (
        <main className="min-h-screen bg-zinc-50 p-6 md:p-10 pt-24">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-zinc-200">
                <div className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-6">
                    <h1 className="text-3xl font-black text-zinc-900">Área de Cliente</h1>
                    <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors">
                        Sair da Conta
                    </button>
                </div>

                <div className="bg-blue-600 text-white p-8 rounded-2xl mb-10 shadow-md">
                    <h2 className="text-2xl font-bold mb-2">Olá, {user.username}!</h2>
                    <p className="opacity-90">O teu email: {user.email}</p>
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 mb-4">O Meu Plano de Treino</h3>

                {user.plano ? (
                    <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
                        <h4 className="text-2xl font-black text-green-900 mb-2">{user.plano.Titulo}</h4>
                        <p className="text-green-700 mb-6">O teu plano de treino atual.</p>
                        <Link href="/plano-treino" className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all">
                            Ver Exercícios do Plano
                        </Link>
                    </div>
                ) : (
                    <div className="bg-zinc-50 p-10 rounded-2xl text-center border-2 border-dashed border-zinc-300">
                        <h4 className="text-xl font-bold text-zinc-800 mb-2">Ainda não tens nenhum plano</h4>
                        <p className="text-zinc-500 max-w-md mx-auto">Fala com o staff na receção para te prepararem um plano à medida.</p>
                    </div>
                )}

                {/* Link para o Painel de Administração */}
                <div className="mt-10 pt-8 border-t border-zinc-200">
                    <Link href="/admin" className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-700 transition-all">
                        Painel de Administração
                    </Link>
                </div>
            </div>
        </main>
    );
}