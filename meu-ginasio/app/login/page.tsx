"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');
        try {
            const res = await fetch('http://localhost:1338/api/auth/local', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await res.json();
            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/area-cliente');
            } else {
                setStatus('Email ou palavra-passe incorretos.');
            }
        } catch {
            setStatus('Erro de ligação ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-zinc-200 p-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-zinc-900 mb-2">Bem-vindo de volta!</h1>
                </div>

                {status && (
                    <div className="bg-zinc-100 text-zinc-800 p-3 rounded-lg text-sm font-bold mb-6 text-center border border-zinc-200">
                        {status}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-1">Nome de Utilizador ou Email</label>
                        <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-400 bg-zinc-50 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-bold text-zinc-900 mb-1">Palavra-passe</label>
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-400 bg-zinc-50 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[38px] text-zinc-500 text-xs font-bold">
                            {showPassword ? "OCULTAR" : "VER"}
                        </button>
                    </div>

                    {/* MENSAGEM EM VEZ DE LINK QUEBRADO */}
                    <p className="text-xs text-zinc-500 italic">
                        Esqueceste a palavra-passe? Fala com o staff no balcão do ginásio para repormos o teu acesso.
                    </p>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl hover:bg-blue-700 transition-colors">
                        {loading ? 'A verificar...' : 'Entrar na Área de Cliente'}
                    </button>
                </form>
            </div>
            <Link href="/" className="mt-8 text-zinc-500 font-medium hover:text-zinc-900">← Voltar ao Início</Link>
        </main>
    );
}