"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchFromStrapi } from '../lib/api';

export default function PlanoTreino() {
    const [listaPlanos, setListaPlanos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('jwt');

            const res = await fetchFromStrapi("planos?populate=*", token);
            const dados = res.data || res;
            if (Array.isArray(dados)) {
                setListaPlanos(dados);
            }
            setLoading(false);
        };
        loadData();
    }, [router]);

    if (loading) return <div className="p-20 text-center font-bold">A carregar...</div>;

    return (
        <main className="min-h-screen bg-zinc-100">
            {/* CABEÇALHO UNIFICADO - Mesma altura e estilo que Horários/Equipa */}
            <div className="bg-[#2563eb] py-16 text-center text-white mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-2">Planos</h1>
                <button onClick={() => router.push('/')} className="text-sm opacity-90 hover:opacity-100 transition mt-2 font-medium">
                    ← Voltar ao Início
                </button>
            </div>

            {/* GRELHA DE PLANOS */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 px-6 pb-20">
                {listaPlanos.map((p: any) => {
                    const data = p.attributes || p;
                    const vantagens = data.Descricao ? data.Descricao.split(/(?=[✅❌])/) : [];

                    return (
                        <div key={p.id} className="bg-white rounded-xl shadow-lg flex flex-col border-t-[6px] border-[#2563eb]">
                            <div className="p-6 border-b border-zinc-100">
                                <h3 className="text-2xl font-bold text-center text-zinc-800">{data.Titulo}</h3>
                            </div>

                            <div className="p-6 text-zinc-700 text-sm space-y-3 flex-grow">
                                {vantagens.length > 0 ? (
                                    vantagens.map((item: string, i: number) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {item.trim()}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center italic">Sem vantagens listadas.</p>
                                )}
                            </div>

                            <div className="p-6 bg-zinc-50 rounded-b-xl border-t border-zinc-100">
                                <div className="text-3xl font-black text-[#2563eb] text-center mb-1">
                                    {data.Preco ? `${data.Preco}€` : "Sob consulta"}
                                </div>
                                <p className="text-[10px] text-zinc-400 text-center uppercase tracking-wider">
                                    *Pagamento no balcão
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}