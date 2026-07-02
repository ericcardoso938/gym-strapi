"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Horarios() {
    const [user, setUser] = useState<any>(null);
    const [reservas, setReservas] = useState<string[]>([]);
    const [modal, setModal] = useState<{ aulaId: string, nome: string, hora: string, isBooked: boolean } | null>(null);
    const [alertMsg, setAlertMsg] = useState('');

    const [dbReservas, setDbReservas] = useState<any[]>([]);

    const fetchReservas = async (userId: string, token: string) => {
        try {
            const res = await fetch(`http://localhost:1338/api/reservas?filters[userId][$eq]=${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.data) {
                setDbReservas(json.data);
                setReservas(json.data.map((r: any) => r.aulaId));
            }
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('jwt');
        if (storedUser && token) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchReservas(parsedUser.id.toString(), token);
        }
    }, []);

    const handleMarcarAula = (aulaId: string, nome: string, hora: string) => {
        if (!user) {
            setAlertMsg("Inicia sessão na tua Área de Cliente para poderes marcar aulas.");
            return;
        }
        const isBooked = reservas.includes(aulaId);
        setModal({ aulaId, nome, hora, isBooked });
    };

    const confirmAction = async () => {
        if (!modal || !user) return;
        const token = localStorage.getItem('jwt');
        
        if (modal.isBooked) {
            const reservaDoc = dbReservas.find(r => r.aulaId === modal.aulaId);
            if (reservaDoc) {
                await fetch(`http://localhost:1338/api/reservas/${reservaDoc.documentId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
        } else {
            await fetch(`http://localhost:1338/api/reservas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ data: { userId: user.id.toString(), username: user.username, aulaId: modal.aulaId, aulaNome: modal.nome } })
            });
        }
        setModal(null);
        await fetchReservas(user.id.toString(), token || '');
    };

    const cores = {
        orange: "bg-[#e87722] text-white",
        blue: "bg-[#3d428b] text-white",
        lightBlue: "bg-[#4a90e2] text-white",
        yellow: "bg-[#d4c12a] text-white",
        pink: "bg-[#d6006e] text-white",
        green: "bg-[#4caf50] text-white",
        purple: "bg-[#8e3a80] text-white",
        cyan: "bg-[#4db6ac] text-white",
    };

    return (
        <main className="min-h-screen bg-zinc-100 pb-20">
            {/* CABEÇALHO UNIFICADO */}
            <div className="bg-[#2563eb] py-16 text-center text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-black mb-2">Horário</h1>
                <Link href="/" className="text-sm opacity-90 hover:opacity-100 transition mt-2 font-medium block">
                    ← Voltar ao Início
                </Link>
            </div>

            <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
                {user ? (
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-xl border border-blue-200 inline-block font-medium shadow-sm">
                        Ei {user.username}! Clica numa aula para a reservares.
                    </div>
                ) : (
                    <div className="bg-zinc-200 text-zinc-600 p-4 rounded-xl border border-zinc-300 inline-block font-medium">
                        🔒 Precisas de entrar na tua conta para marcar aulas. <Link href="/login" className="underline font-bold text-zinc-800 hover:text-blue-600">Fazer login</Link>
                    </div>
                )}
            </div>

            {/* CONTENTOR DOS HORÁRIOS */}
            <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* DIAS DA SEMANA */}
                    <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-2 mb-2">
                        <div></div>
                        {['2ª FEIRA', '3ª FEIRA', '4ª FEIRA', '5ª FEIRA', '6ª FEIRA', 'SÁBADO', 'DOMINGO'].map((dia) => (
                            <div key={dia} className="bg-zinc-800 text-white font-bold text-center py-2 rounded-t-md">
                                {dia}
                            </div>
                        ))}
                    </div>

                    {/* BLOCO DA MANHÃ */}
                    <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-2 mb-4">
                        <div className="bg-zinc-800 text-white flex items-center justify-center rounded-l-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                            <span className="font-bold tracking-widest text-sm p-4">MANHÃ</span>
                        </div>
                        <div className="flex flex-col gap-2"><AulaBox dia="seg" hora="07h20" min="45'" nome="FAT BURN" cor={cores.orange} onBook={handleMarcarAula} reservas={reservas} /></div>
                        <div className="flex flex-col gap-2"><AulaBox dia="ter" hora="07h20" min="45'" nome="LOCAL POWER" cor={cores.blue} onBook={handleMarcarAula} reservas={reservas} /></div>
                        <div className="flex flex-col gap-2"><AulaBox dia="qua" hora="07h20" min="45'" nome="BALANCE" cor={cores.cyan} onBook={handleMarcarAula} reservas={reservas} /></div>
                        <div className="flex flex-col gap-2"><AulaBox dia="qui" hora="07h20" min="45'" nome="CIRCUITO" cor={cores.yellow} onBook={handleMarcarAula} reservas={reservas} /></div>
                        <div className="flex flex-col gap-2"><AulaBox dia="sex" hora="07h20" min="30'" nome="ABS" cor={cores.lightBlue} onBook={handleMarcarAula} reservas={reservas} /></div>
                        <div className="flex flex-col gap-2">
                            <AulaBox dia="sab" hora="10h00" min="45'" nome="CIRCUITO" cor={cores.yellow} onBook={handleMarcarAula} reservas={reservas} />
                            <AulaBox dia="sab" hora="11h00" min="45'" nome="X-TREME" cor={cores.green} onBook={handleMarcarAula} reservas={reservas} />
                        </div>
                        <div className="flex items-center justify-center bg-gray-300 font-bold text-gray-600 rounded-sm">FECHADO</div>
                    </div>

                    {/* BLOCO DA TARDE */}
                    <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-2">
                        <div className="bg-zinc-800 text-white flex items-center justify-center rounded-l-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                            <span className="font-bold tracking-widest text-sm p-4">TARDE</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <AulaBox dia="seg" hora="18h30" min="45'" nome="PUMP" cor={cores.orange} onBook={handleMarcarAula} reservas={reservas} />
                            <AulaBox dia="seg" hora="19h30" min="30'" nome="ABS" cor={cores.lightBlue} onBook={handleMarcarAula} reservas={reservas} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <AulaBox dia="ter" hora="18h30" min="45'" nome="X-TREME" cor={cores.green} onBook={handleMarcarAula} reservas={reservas} />
                            <AulaBox dia="ter" hora="19h30" min="45'" nome="BALANCE" cor={cores.cyan} onBook={handleMarcarAula} reservas={reservas} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <AulaBox dia="qua" hora="18h30" min="45'" nome="CIRCUITO" cor={cores.yellow} onBook={handleMarcarAula} reservas={reservas} />
                            <AulaBox dia="qua" hora="19h30" min="45'" nome="BEAT WORKOUT" cor={cores.purple} onBook={handleMarcarAula} reservas={reservas} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <AulaBox dia="qui" hora="18h30" min="45'" nome="PUMP" cor={cores.orange} onBook={handleMarcarAula} reservas={reservas} />
                            <AulaBox dia="qui" hora="19h30" min="45'" nome="FAT BURN" cor={cores.pink} onBook={handleMarcarAula} reservas={reservas} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <AulaBox dia="sex" hora="18h30" min="45'" nome="X-TREME" cor={cores.green} onBook={handleMarcarAula} reservas={reservas} />
                            <AulaBox dia="sex" hora="19h30" min="45'" nome="BALANCE" cor={cores.cyan} onBook={handleMarcarAula} reservas={reservas} />
                        </div>
                        <div className="flex flex-col gap-2"></div>
                        <div className="flex items-center justify-center bg-gray-300 font-bold text-gray-600 rounded-sm">FECHADO</div>
                    </div>
                </div>
            </div>

            {/* RODAPÉ DO HORÁRIO */}
            <div className="max-w-2xl mx-auto text-center mt-12 border-t border-zinc-400 pt-8 px-4 text-zinc-800">
                <h3 className="font-bold text-lg mb-4">Horário de Funcionamento</h3>
                <p className="mb-2">Seg. a Sex. : 7:15h – 13:30h | 16:00h – 22:00h</p>
                <p className="mb-4">Sáb. : 9:30h – 13:00h | Dom. : Fechado</p>
                <p className="text-sm font-semibold italic">*Cardio e Musculação em todo o período de funcionamento.</p>
            </div>

            {/* MODAL PERSONALIZADO DE CONFIRMAÇÃO */}
            {modal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center transform transition-all">
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${modal.isBooked ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {modal.isBooked 
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                }
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-zinc-900 mb-4">
                            {modal.isBooked ? 'Cancelar Marcação' : 'Confirmar Marcação'}
                        </h3>
                        <p className="text-zinc-600 mb-8 leading-relaxed">
                            {modal.isBooked 
                                ? <>Queres mesmo cancelar a marcação de <strong className="text-zinc-900">{modal.nome}</strong> às <strong className="text-zinc-900">{modal.hora}</strong>?</>
                                : <>Queres confirmar a aula de <strong className="text-zinc-900">{modal.nome}</strong> às <strong className="text-zinc-900">{modal.hora}</strong>?</>
                            }
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setModal(null)} className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-colors">
                                Voltar
                            </button>
                            <button onClick={confirmAction} className={`flex-1 px-6 py-3 rounded-xl font-bold text-white transition-colors shadow-lg ${modal.isBooked ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}`}>
                                {modal.isBooked ? 'Desmarcar' : 'Confirmar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE AVISO (NÃO LOGADO) */}
            {alertMsg && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-zinc-900 mb-2">Atenção</h3>
                        <p className="text-zinc-600 mb-8">{alertMsg}</p>
                        <div className="space-y-3">
                            <Link href="/login" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
                                Fazer Login
                            </Link>
                            <button onClick={() => setAlertMsg('')} className="block w-full text-zinc-500 font-bold py-2 hover:text-zinc-800 transition">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function AulaBox({ dia, hora, min, nome, cor, onBook, reservas }: { dia: string, hora: string, min: string, nome: string, cor: string, onBook: any, reservas: string[] }) {
    const aulaId = `${dia}-${hora}-${nome}`;
    const isBooked = reservas.includes(aulaId);

    return (
        <div 
            onClick={() => onBook(aulaId, nome, hora)}
            className={`${cor} p-2 rounded-sm shadow-sm flex flex-col justify-between min-h-[80px] cursor-pointer hover:opacity-80 hover:shadow-md transition-all relative ${isBooked ? 'ring-4 ring-black/50' : ''}`}
        >
            <div className="flex justify-between items-start text-xs font-medium">
                <span>{hora}</span>
                <span>{min}</span>
            </div>
            <div className="text-center font-black text-sm leading-tight mt-1 mb-2">
                {nome}
            </div>
            {isBooked && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md border-2 border-white">
                    ✔ MARCADA
                </div>
            )}
        </div>
    );
}