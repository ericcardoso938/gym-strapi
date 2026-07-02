"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFromStrapi, deleteFromStrapi } from '../../lib/api';

export default function TreinadoresPage() {
    const [treinadores, setTreinadores] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTreinadores();
    }, []);

    const loadTreinadores = async () => {
        setLoading(true);
        const token = localStorage.getItem('jwt') || "";
        const res = await fetchFromStrapi('treinadors?populate=*', token);
        if (res && res.data) {
            setTreinadores(res.data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Tens a certeza que queres apagar este treinador?")) {
            const token = localStorage.getItem('jwt') || "";
            await deleteFromStrapi('treinadors', id, token);
            loadTreinadores();
        }
    };

    if (loading) return <div className="p-8">A carregar treinadores...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-zinc-900">Treinadores</h1>
                <Link href="/admin/treinadores/novo" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Novo Treinador
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Nome</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Especialidade</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Idade</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Contacto</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {treinadores.map((treinador) => (
                            <tr key={treinador.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{treinador.Nome}</td>
                                <td className="px-6 py-4 text-zinc-600">{treinador.Especialidade}</td>
                                <td className="px-6 py-4 text-zinc-600">{treinador.Idade}</td>
                                <td className="px-6 py-4 text-zinc-600">{treinador.Contacto}</td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <Link href={`/admin/treinadores/editar/${treinador.documentId}`} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                                        Editar
                                    </Link>
                                    <button onClick={() => handleDelete(treinador.documentId)} className="text-red-600 hover:text-red-800 font-semibold text-sm">
                                        Apagar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {treinadores.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">Nenhum treinador encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
