import { fetchFromStrapi } from "../../lib/api";
import Link from 'next/link';

export default async function PerfilTreinador({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let treinador = null;

    try {
        const res = await fetchFromStrapi(`treinadors/${id}?populate=*`);
        if (res.data) {
            treinador = Array.isArray(res.data) ? res.data[0] : res.data;
        }
    } catch (error: any) {
        console.error("Erro ao buscar treinador:", error.message);
    }

    if (!treinador) {
        return (
            <main className="min-h-screen bg-zinc-50 p-10 pt-24 text-center">
                <h1 className="text-3xl font-black text-zinc-950 mb-4">Treinador não encontrado</h1>
                <Link href="/equipa" className="inline-block bg-[#2563eb] text-white px-8 py-3 rounded-xl font-bold">
                    Voltar à Equipa
                </Link>
            </main>
        );
    }

    const imageUrl = treinador.Foto?.url ? `http://localhost:1338${treinador.Foto.url}` : null;

    return (
        <main className="min-h-screen bg-zinc-50 py-20 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-zinc-200">
                <div className="flex flex-col items-center text-center">

                    {/* FOTO */}
                    <div className="w-32 h-32 rounded-full bg-zinc-100 flex items-center justify-center mb-8 overflow-hidden border-4 border-zinc-50 shadow-sm">
                        {imageUrl ? (
                            <img src={imageUrl} className="w-full h-full object-cover" alt={treinador.Nome} />
                        ) : (
                            <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        )}
                    </div>

                    {/* NOME E ESPECIALIDADE */}
                    <h1 className="text-4xl font-black mb-3 text-zinc-950">{treinador.Nome}</h1>
                    <span className="bg-blue-50 text-[#2563eb] font-bold px-6 py-1.5 rounded-full text-sm uppercase tracking-wider mb-10">
                        {treinador.Especialidade}
                    </span>

                    {/* DADOS */}
                    <div className="grid grid-cols-2 gap-4 w-full mb-10">
                        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                            <span className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Idade</span>
                            <span className="text-xl font-black text-zinc-950">{treinador.Idade || "---"} anos</span>
                        </div>
                        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                            <span className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Contacto</span>
                            <span className="text-xl font-black text-zinc-950">{treinador.Contacto || "---"}</span>
                        </div>
                    </div>

                    {/* SOBRE MIM */}
                    <div className="text-left w-full">
                        <h3 className="font-black text-2xl mb-4 text-zinc-950">Sobre Mim</h3>
                        <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 text-zinc-700 leading-relaxed italic">
                            {treinador.Biografia || "Nenhuma informação biográfica disponível."}
                        </div>
                    </div>

                    {/* BOTÃO VOLTAR */}
                    <div className="mt-12">
                        <Link href="/equipa" className="text-[#2563eb] font-bold hover:underline flex items-center gap-2">
                            ← Voltar à página de Equipa
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}