"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFromStrapi, deleteFromStrapi } from '../../lib/api';

export default function PlanosPage() {
    const [planos, setPlanos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPlanos();
    }, []);

    const loadPlanos = async () => {
        setLoading(true);
        const token = localStorage.getItem('jwt') || "";
        const res = await fetchFromStrapi('planos?populate=*', token);
        if (res && res.data) {
            setPlanos(res.data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Tens a certeza que queres apagar este plano?")) {
            const token = localStorage.getItem('jwt') || "";
            await deleteFromStrapi('planos', id, token);
            loadPlanos();
        }
    };

    if (loading) return <div className="p-8">A carregar planos...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-zinc-900">Planos</h1>
                <Link href="/admin/planos/novo" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Novo Plano
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Título</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Preço</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Descrição</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {planos.map((plano) => (
                            <tr key={plano.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{plano.Titulo}</td>
                                <td className="px-6 py-4 text-zinc-600">{plano.Preco}€</td>
                                <td className="px-6 py-4 text-zinc-600">
                                    {plano.Descricao?.length > 50 ? `${plano.Descricao.substring(0, 50)}...` : plano.Descricao}
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <Link href={`/admin/planos/editar/${plano.documentId}`} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                                        Editar
                                    </Link>
                                    <button onClick={() => handleDelete(plano.documentId)} className="text-red-600 hover:text-red-800 font-semibold text-sm">
                                        Apagar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {planos.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">Nenhum plano encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
