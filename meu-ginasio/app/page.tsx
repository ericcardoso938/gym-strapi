'use client';

import { useState } from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <section className="bg-blue-600 text-white py-24 text-center px-6">
                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Supera os teus limites.</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">O melhor ambiente, equipamentos de topo e profissionais dedicados a ti.</p>
            </section>

            {/* SECÇÃO - VOUCHER DE PRIMEIRO TREINO GRÁTIS */}
            <section className="py-20 px-6 bg-white">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="max-w-4xl mx-auto border-2 border-dashed border-blue-300 rounded-3xl p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-white shadow-sm cursor-pointer hover:border-blue-600 hover:shadow-xl transition-all duration-300"
                >
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-black text-zinc-950 mb-2">Primeiro Treino Grátis</h2>
                        <p className="text-zinc-600">Clica aqui para ver os termos e condições e o teu código.</p>
                    </div>
                    <div className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-xl tracking-widest shadow-lg hover:bg-blue-700 transition-colors">
                        RESGATAR
                    </div>
                </div>
            </section>

            {/* MODAL APENAS COM TERMOS E CÓDIGO VISÍVEL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white p-8 rounded-3xl max-w-lg w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 font-black text-xl">✕</button>

                        <h3 className="text-2xl font-black mb-4">Termos e Condições</h3>
                        <ul className="text-zinc-600 space-y-2 list-disc pl-5 text-sm mb-6">
                            <li>O voucher é válido apenas para novos clientes.</li>
                            <li>Limitado a uma utilização por pessoa.</li>
                            <li>Necessária identificação pessoal.</li>
                            <li>Apresentar este código na receção do ginásio no momento da visita.</li>
                            <li>Válido até 31 de dezembro de 2026.</li>
                        </ul>

                        <div className="border-t pt-6">
                            <div className="bg-zinc-100 p-4 rounded-xl text-center border border-zinc-200 mb-6">
                                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Código do Voucher:</p>
                                <p className="text-2xl font-black text-blue-600 tracking-widest uppercase">primeiro</p>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PORQUÊ TREINAR NO GYMPRO? */}
            <section className="py-20 px-6 bg-zinc-50 border-t border-zinc-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black text-zinc-950 text-center mb-16">Porquê treinar no GymPro?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { titulo: "Equipamentos", desc: "Acesso às máquinas de última geração para resultados reais." },
                            { titulo: "Acompanhamento", desc: "Acompanhamento personalizado para todos os níveis." },
                            { titulo: "Comunidade", desc: "Ambiente motivador que te faz querer voltar todos os dias." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all text-center">
                                <h4 className="text-lg font-black mb-3 text-blue-600 uppercase tracking-wider">{item.titulo}</h4>
                                <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LOCALIZAÇÃO */}
            <section className="py-20 px-6 bg-white border-t border-zinc-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black text-zinc-950 text-center mb-6">A nossa localização</h2>
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 mb-6">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.6663595507424!2d-8.397637823547146!3d39.60098527158485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd186259e8751dc7%3A0x6b107e382d5ccf57!2sInstituto%20Polit%C3%A9cnico%20de%20Tomar!5e0!3m2!1spt-PT!2spt!4v1717000000000!5m2!1spt-PT!2spt" 
                            width="100%" 
                            height="400" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <p className="text-center text-sm text-zinc-500 max-w-2xl mx-auto italic">
                        Nota: O GymPro é um projeto desenvolvido no âmbito académico para o Instituto Politécnico de Tomar (IPT).
                    </p>
                </div>
            </section>

            {/* RODAPÉ */}
            <footer className="text-center py-12 border-t border-zinc-100 bg-white">
                <p className="font-bold text-zinc-900 text-sm">GymPro © 2026 | Projeto Web</p>
            </footer>
        </main>
    );
}