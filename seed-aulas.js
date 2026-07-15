// Script para popular as aulas na base de dados do Strapi
// Executar com: node seed-aulas.js

const STRAPI_URL = "http://localhost:1338";

// Todas as aulas do horário atual
const aulas = [
  // MANHÃ
  { Nome: "FAT BURN", Horario: "07h20", Dia: "seg", Duracao: "45'", Periodo: "manha", Cor: "orange" },
  { Nome: "LOCAL POWER", Horario: "07h20", Dia: "ter", Duracao: "45'", Periodo: "manha", Cor: "blue" },
  { Nome: "BALANCE", Horario: "07h20", Dia: "qua", Duracao: "45'", Periodo: "manha", Cor: "cyan" },
  { Nome: "CIRCUITO", Horario: "07h20", Dia: "qui", Duracao: "45'", Periodo: "manha", Cor: "yellow" },
  { Nome: "ABS", Horario: "07h20", Dia: "sex", Duracao: "30'", Periodo: "manha", Cor: "lightBlue" },
  { Nome: "CIRCUITO", Horario: "10h00", Dia: "sab", Duracao: "45'", Periodo: "manha", Cor: "yellow" },
  { Nome: "X-TREME", Horario: "11h00", Dia: "sab", Duracao: "45'", Periodo: "manha", Cor: "green" },

  // TARDE
  { Nome: "PUMP", Horario: "18h30", Dia: "seg", Duracao: "45'", Periodo: "tarde", Cor: "orange" },
  { Nome: "ABS", Horario: "19h30", Dia: "seg", Duracao: "30'", Periodo: "tarde", Cor: "lightBlue" },
  { Nome: "X-TREME", Horario: "18h30", Dia: "ter", Duracao: "45'", Periodo: "tarde", Cor: "green" },
  { Nome: "BALANCE", Horario: "19h30", Dia: "ter", Duracao: "45'", Periodo: "tarde", Cor: "cyan" },
  { Nome: "CIRCUITO", Horario: "18h30", Dia: "qua", Duracao: "45'", Periodo: "tarde", Cor: "yellow" },
  { Nome: "BEAT WORKOUT", Horario: "19h30", Dia: "qua", Duracao: "45'", Periodo: "tarde", Cor: "purple" },
  { Nome: "PUMP", Horario: "18h30", Dia: "qui", Duracao: "45'", Periodo: "tarde", Cor: "orange" },
  { Nome: "FAT BURN", Horario: "19h30", Dia: "qui", Duracao: "45'", Periodo: "tarde", Cor: "pink" },
  { Nome: "X-TREME", Horario: "18h30", Dia: "sex", Duracao: "45'", Periodo: "tarde", Cor: "green" },
  { Nome: "BALANCE", Horario: "19h30", Dia: "sex", Duracao: "45'", Periodo: "tarde", Cor: "cyan" },
];

async function loginAdmin() {
  // Primeiro tenta obter um token de admin via API token ou login
  // Usa a API pública se as permissões estiverem configuradas
  return null;
}

async function seedAulas() {
  console.log("A iniciar seed das aulas...\n");

  let created = 0;
  let errors = 0;

  for (const aula of aulas) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/aulas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: aula }),
      });

      const json = await res.json();

      if (res.ok) {
        console.log(`✅ Criada: ${aula.Nome} (${aula.Dia} ${aula.Horario})`);
        created++;

        // Publicar a aula (Strapi 5 com draftAndPublish)
        if (json.data && json.data.documentId) {
          await fetch(`${STRAPI_URL}/api/aulas/${json.data.documentId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { ...aula } }),
          });
        }
      } else {
        console.log(`❌ Erro ao criar ${aula.Nome}: ${JSON.stringify(json.error?.message || json)}`);
        errors++;
      }
    } catch (err) {
      console.log(`❌ Erro de rede ao criar ${aula.Nome}: ${err}`);
      errors++;
    }
  }

  console.log(`\n--- Resultado ---`);
  console.log(`Criadas: ${created}`);
  console.log(`Erros: ${errors}`);
  console.log(`Total: ${aulas.length}`);
}

seedAulas();
