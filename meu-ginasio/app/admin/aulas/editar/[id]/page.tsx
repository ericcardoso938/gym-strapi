"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchFromStrapi } from '../../../../lib/api';

export default function EditarAula() {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [horario, setHorario] = useState('');
    const [treinadorId, setTreinadorId] = useState('');
    const [treinadores, setTreinadores] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('jwt') || "";
            // Load treinadores
            const resTreinadores = await fetchFromStrapi('treinadors', token);
            if (resTreinadores && resTreinadores.data) {
                setTreinadores(resTreinadores.data);
            }

            // Load aula
            const resAula = await fetchFromStrapi(`aulas/${id}?populate=*`, token);
            if (resAula && resAula.data) {
                setNome(resAula.data.Nome || '');
                setHorario(resAula.data.Horario || '');
                if (resAula.data.treinador) {
                    setTreinadorId(resAula.data.treinador.id || '');
                }
            }
            setLoading(false);
        };
        loadData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem('jwt') || "";
        
        const payload = {
            data: {
                Nome: nome,
                Horario: horario,
                treinador: treinadorId ? treinadorId : null
            }
        };

        try {
            const response = await fetch(`http://localhost:1338/api/aulas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                router.push('/admin/aulas');
            } else {
                alert("Erro ao editar a aula.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de ligação.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">A carregar...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/aulas" className="text-zinc-500 hover:text-zinc-900 font-bold">
                    ← Voltar
                </Link>
                <h1 className="text-3xl font-black text-zinc-900">Editar Aula</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Nome da Aula</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Horário (ex: 18h30 45')</label>
                    <input type="text" value={horario} onChange={(e) => setHorario(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Treinador</label>
                    <select value={treinadorId} onChange={(e) => setTreinadorId(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="">Sem treinador (Opcional)</option>
                        {treinadores.map(t => (
                            <option key={t.documentId || t.id} value={t.documentId || t.id}>{t.Nome}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={saving} className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-colors">
                        {saving ? 'A guardar...' : 'Guardar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
}
