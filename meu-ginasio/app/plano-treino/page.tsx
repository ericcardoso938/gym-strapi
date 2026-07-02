"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchFromStrapi } from '../lib/api';

export default function PlanoTreino() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [openDays, setOpenDays] = useState<number[]>([]);
    const [selectedExercicio, setSelectedExercicio] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const userData = await fetchFromStrapi("users/me?populate=plano", token);

                if (userData.error) {
                    localStorage.removeItem('jwt');
                    router.push('/login');
                    return;
                }

                setUser(userData);
            } catch (error) {
                console.error("Erro ao carregar plano:", error);
                localStorage.removeItem('jwt');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router]);

    const getImageForExercise = (name: string) => {
        const lowerName = name.toLowerCase();

        // Cardio e Alongamentos
        if (lowerName.includes("cardio") || lowerName.includes("caminhada") || lowerName.includes("elíptica") || lowerName.includes("bicicleta") || lowerName.includes("esteira")) return "https://fitnessprogramer.com/wp-content/uploads/2021/04/Treadmill.gif";
        if (lowerName.includes("alongamento") || lowerName.includes("stretching") || lowerName.includes("descanso")) return "https://fitnessprogramer.com/wp-content/uploads/2021/06/yoga-mat.gif"; // Placeholder genérico suave

        // Costas e Posterior de Ombro (Facepull)
        if (lowerName.includes("facepull") || lowerName.includes("face pull")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif";
        if (lowerName.includes("terra") || lowerName.includes("deadlift")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif";
        if (lowerName.includes("barra fixa") || lowerName.includes("elevações (pull") || lowerName.includes("elevacoes") || lowerName.includes("pull up") || lowerName.includes("pull-up")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif";
        if (lowerName.includes("pullover") || lowerName.includes("pull over")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Pullover.gif";
        if (lowerName.includes("puxada") || lowerName.includes("lat pulldown") || lowerName.includes("puxador")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif";
        if (lowerName.includes("remada sentada") || lowerName.includes("remada baixa") || lowerName.includes("triangulo") || lowerName.includes("triângulo")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif";
        if (lowerName.includes("remada unilateral") || lowerName.includes("serrote")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif";
        if (lowerName.includes("remada curvada") || lowerName.includes("remada cavalinho") || lowerName.includes("t-bar")) return "https://fitnessprogramer.com/wp-content/uploads/2021/06/One-Arm-Barbell-Row-.gif";
        if (lowerName.includes("remada") || lowerName.includes("row")) return "https://fitnessprogramer.com/wp-content/uploads/2021/06/One-Arm-Barbell-Row-.gif";
        
        // Tríceps
        if (lowerName.includes("triceps na polia") || lowerName.includes("tríceps na polia") || lowerName.includes("triceps corda") || lowerName.includes("tríceps corda") || lowerName.includes("triceps pulley")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif";
        if (lowerName.includes("testa")) return "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Lying-Back-of-the-Head-Tricep-Extension.gif";
        if (lowerName.includes("francesa") || lowerName.includes("francês") || lowerName.includes("frances")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Triceps-Press.gif";
        if (lowerName.includes("coice") || lowerName.includes("kickback")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif";
        if (lowerName.includes("mergulho") || lowerName.includes("dips") || lowerName.includes("paralela") || lowerName.includes("banco")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif";
        if (lowerName.includes("triceps") || lowerName.includes("tríceps")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif";

        // Peito
        if (lowerName.includes("supino") && lowerName.includes("inclinado")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif";
        if (lowerName.includes("supino") && lowerName.includes("declinado")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif";
        if (lowerName.includes("supino")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif";
        if (lowerName.includes("crucifixo") || lowerName.includes("fly")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif";
        if (lowerName.includes("voador") || lowerName.includes("pec deck") || lowerName.includes("peck deck")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Peck-Deck-Fly.gif";
        if (lowerName.includes("cross") || lowerName.includes("crossover") || (lowerName.includes("polia") && lowerName.includes("peito"))) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif";
        
        // Bíceps
        if (lowerName.includes("rosca inversa") || lowerName.includes("inversa") || lowerName.includes("reversa")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Reverse-Curl.gif";
        if (lowerName.includes("concentrada")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif";
        if (lowerName.includes("scott")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Preacher-Curl.gif";
        if (lowerName.includes("rosca direta") || lowerName.includes("rosca com barra") || lowerName.includes("rosca w") || lowerName.includes("rosca 21")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif";
        if (lowerName.includes("rosca martelo") || lowerName.includes("hammer")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif";
        if (lowerName.includes("rosca polia") || lowerName.includes("cabo")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Curl.gif";
        if (lowerName.includes("rosca alternada") || lowerName.includes("rosca simultanea")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif";
        if (lowerName.includes("rosca") || lowerName.includes("biceps") || lowerName.includes("bíceps") || lowerName.includes("curl")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif";
        
        // Pernas e Glúteos
        if (lowerName.includes("goblet")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Goblet-Squat.gif";
        if (lowerName.includes("stiff") || lowerName.includes("romanian")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif";
        if (lowerName.includes("afundo") || lowerName.includes("lunge") || lowerName.includes("passada") || lowerName.includes("bulgaro") || lowerName.includes("búlgaro")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif";
        if (lowerName.includes("pélvica") || lowerName.includes("pelvica") || lowerName.includes("hip thrust") || lowerName.includes("elevação de quadril")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif";
        if (lowerName.includes("abdutora") || lowerName.includes("abdução") || lowerName.includes("abducao")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Hip-Abduction.gif";
        if (lowerName.includes("adutora") || lowerName.includes("adução") || lowerName.includes("aducao")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Hip-Adduction.gif";
        if (lowerName.includes("gluteo") || lowerName.includes("glúteo") || lowerName.includes("coice no cabo")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Glute-Kickback.gif";
        if (lowerName.includes("hack")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hack-Squat.gif";
        if (lowerName.includes("sentado") && (lowerName.includes("gemeos") || lowerName.includes("gêmeos") || lowerName.includes("gémeos"))) return "https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Seated-Calf-Raise.gif";
        if (lowerName.includes("gemeos") || lowerName.includes("gêmeos") || lowerName.includes("gémeos") || lowerName.includes("panturrilha") || lowerName.includes("calf")) return "https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Calf-Raise.gif";
        if (lowerName.includes("agachamento") || lowerName.includes("squat")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif";
        if (lowerName.includes("leg press") || lowerName.includes("legpress")) return "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif";
        if (lowerName.includes("extensora") || lowerName.includes("extensao") || lowerName.includes("extensão")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif";
        if (lowerName.includes("flexora") || lowerName.includes("flexao") || lowerName.includes("flexão")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif";

        // Ombros
        if (lowerName.includes("desenvolvimento arnold") || lowerName.includes("arnold press")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif";
        if (lowerName.includes("press de ombros") || lowerName.includes("desenvolvimento") || lowerName.includes("ombro")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif";
        if (lowerName.includes("elevacao lateral") || lowerName.includes("elevação lateral") || lowerName.includes("elevações laterais") || lowerName.includes("lateral raise")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif";
        if (lowerName.includes("frontal")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Raise.gif";
        if (lowerName.includes("encolhimento") || lowerName.includes("trapezio") || lowerName.includes("trapézio") || lowerName.includes("shrug")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif";
        if (lowerName.includes("remada alta")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Upright-Row.gif";
        if (lowerName.includes("manguito") || lowerName.includes("rotador")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Internal-Rotation.gif";
        
        // Abdominais, Core e Lombar
        if (lowerName.includes("lombar") || lowerName.includes("hiperextensao") || lowerName.includes("hiperextensão")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hyperextension.gif";
        if (lowerName.includes("prancha") || lowerName.includes("plank")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif";
        if (lowerName.includes("infra") || lowerName.includes("elevação de pernas") || lowerName.includes("elevacao de pernas")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Raise.gif";
        if (lowerName.includes("obliquo") || lowerName.includes("oblíquo") || lowerName.includes("russian twist") || lowerName.includes("torção")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif";
        if (lowerName.includes("abdominal") || lowerName.includes("crunch") || lowerName.includes("abdominais")) return "https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch.gif";

        // Fallback genérico
        return "/boneco_exercicio.jpg";
    };

    const toggleDay = (index: number) => {
        if (openDays.includes(index)) {
            setOpenDays(openDays.filter(i => i !== index));
        } else {
            setOpenDays([...openDays, index]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-zinc-600 font-semibold">A carregar o teu plano...</p>
                </div>
            </div>
        );
    }

    const plano = user?.plano;
    const exerciciosText = plano?.Exercicios || "";

    // Agrupar exercícios por Dia
    const linhas = exerciciosText
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0);

    const dias: { titulo: string; exercicios: string[] }[] = [];
    let diaAtual: { titulo: string; exercicios: string[] } | null = null;

    linhas.forEach((linha: string) => {
        if (linha.toUpperCase().startsWith("DIA ")) {
            if (diaAtual) {
                dias.push(diaAtual);
            }
            diaAtual = { titulo: linha, exercicios: [] };
        } else {
            if (!diaAtual) {
                diaAtual = { titulo: "Exercícios", exercicios: [] };
            }
            diaAtual.exercicios.push(linha);
        }
    });
    if (diaAtual) {
        dias.push(diaAtual);
    }

    return (
        <main className="min-h-screen bg-zinc-50">
            {/* Cabeçalho */}
            <div className="bg-blue-600 py-16 text-center text-white mb-12 shadow-inner">
                <h1 className="text-4xl md:text-5xl font-black mb-2 text-white">O Meu Plano de Treino</h1>
                <p className="text-blue-100 text-lg mt-2">
                    {plano ? plano.Titulo : "Sem plano atribuído"}
                </p>
                <Link
                    href="/area-cliente"
                    className="text-sm opacity-90 hover:opacity-100 transition mt-4 font-medium inline-block"
                >
                    ← Voltar à Área de Cliente
                </Link>
            </div>

            <div className="max-w-3xl mx-auto px-6 pb-20">
                {plano ? (
                    <>
                        {/* Info do Plano */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-zinc-100 overflow-hidden mb-8">
                            <div className="bg-blue-50 px-8 py-8 border-b border-blue-100/50">
                                <h2 className="text-2xl font-black text-blue-950">{plano.Titulo}</h2>
                            </div>

                            {/* Lista de Exercícios Agrupada por Dia */}
                            <div className="p-8">
                                {dias.length > 0 ? (
                                    <div className="space-y-4">
                                        {dias.map((dia, index) => {
                                            const isOpen = openDays.includes(index);
                                            return (
                                                <div key={index} className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300">
                                                    <button 
                                                        onClick={() => toggleDay(index)}
                                                        className="w-full flex items-center justify-between p-5 bg-zinc-50/50 hover:bg-blue-50/50 transition-colors text-left"
                                                    >
                                                        <h3 className="text-lg font-bold text-zinc-800">{dia.titulo}</h3>
                                                        <span className={`text-blue-500 font-bold text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                                                            ↓
                                                        </span>
                                                    </button>
                                                    
                                                    {isOpen && (
                                                        <div className="p-5 border-t border-zinc-100 bg-white space-y-3">
                                                            {dia.exercicios.map((exercicio, exIndex) => {
                                                                const isSelected = selectedExercicio === exercicio;
                                                                return (
                                                                    <div key={exIndex} className="border border-zinc-100 rounded-xl overflow-hidden transition-all">
                                                                        <button
                                                                            onClick={() => setSelectedExercicio(isSelected ? null : exercicio)}
                                                                            className="w-full flex items-center gap-4 p-4 bg-white hover:bg-blue-50 hover:shadow-sm transition-all text-left group"
                                                                        >
                                                                            <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                                                {exIndex + 1}
                                                                            </span>
                                                                            <p className="text-zinc-700 font-medium pt-1 flex-1">{exercicio}</p>
                                                                            <span className={`text-zinc-400 font-bold text-xs transition-colors ${isSelected ? "text-blue-500" : ""}`}>
                                                                                VER IMAGEM
                                                                            </span>
                                                                        </button>
                                                                        
                                                                        {isSelected && (
                                                                            <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-center">
                                                                                <img 
                                                                                    src={getImageForExercise(exercicio)} 
                                                                                    alt={`Ilustração do exercício ${exercicio}`} 
                                                                                    referrerPolicy="no-referrer"
                                                                                    className="w-full max-w-sm h-auto object-contain rounded-xl mix-blend-multiply"
                                                                                    onError={(e) => {
                                                                                        const target = e.target as HTMLImageElement;
                                                                                        if (!target.src.includes("boneco_exercicio.jpg")) {
                                                                                            target.src = "/boneco_exercicio.jpg";
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-zinc-400">
                                        <p className="text-lg font-semibold">Sem exercícios listados neste plano.</p>
                                        <p className="text-sm mt-1">Contacta o teu treinador para mais informações.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Botão voltar */}
                        <div className="text-center">
                            <Link
                                href="/area-cliente"
                                className="inline-block bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl"
                            >
                                ← Voltar à Área de Cliente
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-16 text-center">
                        <h2 className="text-2xl font-bold text-zinc-800 mb-3">Sem plano atribuído</h2>
                        <p className="text-zinc-500 max-w-md mx-auto mb-8">
                            Ainda não tens um plano de treino associado à tua conta. Contacta a receção ou o teu treinador para ativar o teu plano.
                        </p>
                        <Link
                            href="/area-cliente"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                        >
                            ← Voltar à Área de Cliente
                        </Link>
                    </div>
                )}
            </div>

        </main>
    );
}
