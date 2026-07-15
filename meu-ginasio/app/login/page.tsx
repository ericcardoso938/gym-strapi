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

    // Estado do modal de trocar password
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [changeEmail, setChangeEmail] = useState('');
    const [changeOldPass, setChangeOldPass] = useState('');
    const [changeNewPass, setChangeNewPass] = useState('');
    const [changeConfirmPass, setChangeConfirmPass] = useState('');
    const [changeStatus, setChangeStatus] = useState('');
    const [changeStatusType, setChangeStatusType] = useState<'success' | 'error' | ''>('');
    const [changeLoading, setChangeLoading] = useState(false);

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

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setChangeStatus('');
        setChangeStatusType('');

        if (changeNewPass !== changeConfirmPass) {
            setChangeStatus('As palavras-passe novas não coincidem.');
            setChangeStatusType('error');
            return;
        }

        if (changeNewPass.length < 6) {
            setChangeStatus('A nova palavra-passe deve ter pelo menos 6 caracteres.');
            setChangeStatusType('error');
            return;
        }

        setChangeLoading(true);

        try {
            // 1. Verificar as credenciais antigas fazendo login
            const loginRes = await fetch('http://localhost:1338/api/auth/local', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: changeEmail, password: changeOldPass }),
            });
            const loginData = await loginRes.json();

            if (!loginData.jwt) {
                setChangeStatus('Email ou palavra-passe atual incorretos.');
                setChangeStatusType('error');
                setChangeLoading(false);
                return;
            }

            // 2. Usar o token obtido para alterar a password
            const changeRes = await fetch('http://localhost:1338/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginData.jwt}`,
                },
                body: JSON.stringify({
                    currentPassword: changeOldPass,
                    password: changeNewPass,
                    passwordConfirmation: changeConfirmPass,
                }),
            });

            const changeData = await changeRes.json();

            if (changeRes.ok && changeData.jwt) {
                setChangeStatus('Palavra-passe alterada com sucesso! Já podes fazer login.');
                setChangeStatusType('success');
                setChangeOldPass('');
                setChangeNewPass('');
                setChangeConfirmPass('');
                // Fechar modal após 2 segundos
                setTimeout(() => {
                    setShowChangeModal(false);
                    setChangeStatus('');
                    setChangeStatusType('');
                }, 2500);
            } else {
                setChangeStatus(changeData?.error?.message || 'Erro ao alterar a palavra-passe.');
                setChangeStatusType('error');
            }
        } catch {
            setChangeStatus('Erro de ligação ao servidor.');
            setChangeStatusType('error');
        } finally {
            setChangeLoading(false);
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

                    {/* BOTÃO DE TROCAR PALAVRA-PASSE */}
                    <button
                        type="button"
                        onClick={() => { setShowChangeModal(true); setChangeStatus(''); setChangeStatusType(''); }}
                        className="text-sm text-blue-600 font-bold hover:text-blue-800 hover:underline transition-colors"
                    >
                        Esqueceste a palavra-passe? Trocar aqui
                    </button>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl hover:bg-blue-700 transition-colors">
                        {loading ? 'A verificar...' : 'Entrar na Área de Cliente'}
                    </button>
                </form>
            </div>
            <Link href="/" className="mt-8 text-zinc-500 font-medium hover:text-zinc-900">← Voltar ao Início</Link>

            {/* MODAL DE TROCAR PALAVRA-PASSE */}
            {showChangeModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowChangeModal(false)}>
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-zinc-200 p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-zinc-900">Trocar Palavra-passe</h2>
                            <button onClick={() => setShowChangeModal(false)} className="text-zinc-400 hover:text-zinc-700 text-2xl font-bold transition-colors">✕</button>
                        </div>

                        {changeStatus && (
                            <div className={`p-3 rounded-lg text-sm font-bold mb-4 text-center border ${changeStatusType === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                                {changeStatus}
                            </div>
                        )}

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-zinc-900 mb-1">Email ou Nome de Utilizador</label>
                                <input type="text" value={changeEmail} onChange={(e) => setChangeEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-400 bg-zinc-50 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-900 mb-1">Palavra-passe Atual</label>
                                <input type="password" value={changeOldPass} onChange={(e) => setChangeOldPass(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-400 bg-zinc-50 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-900 mb-1">Nova Palavra-passe</label>
                                <input type="password" value={changeNewPass} onChange={(e) => setChangeNewPass(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-400 bg-zinc-50 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-900 mb-1">Confirmar Nova Palavra-passe</label>
                                <input type="password" value={changeConfirmPass} onChange={(e) => setChangeConfirmPass(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-400 bg-zinc-50 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>

                            <button type="submit" disabled={changeLoading} className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl hover:bg-blue-700 transition-colors mt-2">
                                {changeLoading ? 'A alterar...' : 'Alterar Palavra-passe'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}