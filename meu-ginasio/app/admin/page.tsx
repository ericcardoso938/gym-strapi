"use client";

import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '../lib/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>({ clientes: 0, planos: 0, treinadores: 0, aulas: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            const token = localStorage.getItem('jwt') || "";
            const [clientes, planos, treinadores, aulas] = await Promise.all([
                fetchFromStrapi("clientes", token),
                fetchFromStrapi("planos", token),
                fetchFromStrapi("treinadors", token),
                fetchFromStrapi("aulas", token),
            ]);
            setStats({
                clientes: clientes.data?.length || 0,
                planos: planos.data?.length || 0,
                treinadores: treinadores.data?.length || 0,
                aulas: aulas.data?.length || 0,
            });
            setLoading(false);
        };
        loadStats();
    }, []);

    const cards = [
        { label: "Clientes", value: stats.clientes, color: "bg-blue-600" },
        { label: "Planos", value: stats.planos, color: "bg-green-600" },
        { label: "Treinadores", value: stats.treinadores, color: "bg-purple-600" },
        { label: "Aulas", value: stats.aulas, color: "bg-orange-500" },
    ];

    if (loading) return <div className="text-center py-20 font-bold text-zinc-500">A carregar dashboard...</div>;

    return (
        <div>
            <h1 className="text-3xl font-black text-zinc-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                        <div className={`${card.color} px-6 py-4 text-white font-bold uppercase tracking-wider text-sm`}>
                            {card.label}
                        </div>
                        <div className="p-6">
                            <p className="text-4xl font-black text-zinc-900">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
