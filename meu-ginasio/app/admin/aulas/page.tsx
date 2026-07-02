"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFromStrapi, deleteFromStrapi } from '../../lib/api';

export default function AulasPage() {
    const [aulas, setAulas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAulas();
    }, []);

    const loadAulas = async () => {
        setLoading(true);
        const token = localStorage.getItem('jwt') || "";
        const res = await fetchFromStrapi('aulas?populate=*', token);
        if (res && res.data) {
            setAulas(res.data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Tens a certeza que queres apagar esta aula?")) {
            const token = localStorage.getItem('jwt') || "";
            await deleteFromStrapi('aulas', id, token);
            loadAulas();
        }
    };

    if (loading) return <div className="p-8">A carregar aulas...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-zinc-900">Aulas</h1>
                <Link href="/admin/aulas/novo" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Nova Aula
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Nome</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Horário</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm">Treinador</th>
                            <th className="px-6 py-4 font-bold text-zinc-700 text-sm text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {aulas.map((aula) => (
                            <tr key={aula.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{aula.Nome}</td>
                                <td className="px-6 py-4 text-zinc-600">{aula.Horario}</td>
                                <td className="px-6 py-4 text-zinc-600">
                                    {aula.treinador ? <span className="bg-zinc-100 px-3 py-1 rounded-full text-xs font-bold text-zinc-700">{aula.treinador.Nome}</span> : <span className="text-zinc-400 italic">Sem treinador</span>}
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <Link href={`/admin/aulas/editar/${aula.documentId}`} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                                        Editar
                                    </Link>
                                    <button onClick={() => handleDelete(aula.documentId)} className="text-red-600 hover:text-red-800 font-semibold text-sm">
                                        Apagar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {aulas.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">Nenhuma aula encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
