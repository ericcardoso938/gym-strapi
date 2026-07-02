"use client";

import { useEffect, useState } from 'react';
import { fetchFromStrapi } from "../lib/api";
import Link from 'next/link';

export default function Equipa() {
    const [treinadores, setTreinadores] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchFromStrapi("treinadors?populate=*");
                setTreinadores(res.data || []);
            } catch (error) {
                console.error("Erro ao carregar equipa:", error);
            }
        };
        loadData();
    }, []);

    return (
        <main className="min-h-screen bg-zinc-100 pb-20">
            {/* CABEÇALHO UNIFICADO */}
            <div className="bg-[#2563eb] py-16 text-center text-white mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-2">A Nossa Equipa</h1>
                <Link href="/" className="text-sm opacity-90 hover:opacity-100 transition mt-2 font-medium block">
                    ← Voltar ao Início
                </Link>
            </div>

            {/* LISTA DE TREINADORES */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-lg text-zinc-600 font-medium">Conhece os profissionais que te vão acompanhar.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {treinadores.map((treinador: any) => {
                        const imageUrl = treinador.Foto?.url ? `http://localhost:1338${treinador.Foto.url}` : null;
                        const linkId = treinador.documentId || treinador.id;

                        return (
                            <div key={treinador.id} className="bg-white rounded-3xl border border-zinc-200 p-8 flex flex-col items-center hover:border-[#2563eb] transition-all duration-300 shadow-sm hover:shadow-lg">
                                <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6 text-zinc-400 overflow-hidden">
                                    {imageUrl ? <img src={imageUrl} alt={treinador.Nome} className="w-full h-full object-cover" /> : <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
                                </div>
                                <Link href={`/treinador/${linkId}`}>
                                    <h3 className="text-2xl font-black text-zinc-950 mb-3 hover:text-[#2563eb] transition-colors cursor-pointer">{treinador.Nome}</h3>
                                </Link>
                                <span className="bg-blue-50 text-[#2563eb] font-bold px-5 py-1.5 rounded-full text-xs uppercase tracking-wider">{treinador.Especialidade}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}