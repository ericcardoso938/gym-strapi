"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditarCliente() {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem('jwt');
            const res = await fetch('http://localhost:1338/api/clientes/' + id, { headers: { 'Authorization': 'Bearer ' + token }});
            const { data } = await res.json();
            if(data) { setNome(data.Nome || ''); setObjetivo(data.Objetivo || ''); }
        };
        load();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt') || "";
        const payload = { data: { Nome: nome, Objetivo: objetivo } };
        const res = await fetch('http://localhost:1338/api/clientes/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify(payload)
        });
        if (res.ok) router.push('/admin/clientes');
        else alert("Erro");
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl border">
            <Link href="/admin/clientes" className="text-zinc-500 font-bold mb-4 block">← Voltar</Link>
            <h1 className="text-3xl font-black mb-6 text-zinc-900">Editar Cliente</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} className="w-full p-3 border rounded-xl text-zinc-900 placeholder-zinc-400" required/>
                <input type="text" placeholder="Objetivo" value={objetivo} onChange={e=>setObjetivo(e.target.value)} className="w-full p-3 border rounded-xl text-zinc-900 placeholder-zinc-400" required/>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold">Atualizar</button>
            </form>
        </div>
    );
}