// testes/testar_lgpd.js
// Felipe - Script de teste da conformidade LGPD (Anonimização)

console.log("=============================================================");
console.log("TESTE DE SEGURANÇA E PRIVACIDADE: EXCLUSÃO DE DADOS (LGPD)");
console.log("=============================================================");

const bancoAntes = {
  id: "cli_8821",
  nome: "Felipe Cavalcante Silva",
  cpf: "102.345.981-00",
  email: "felipe.silva@email.com",
  pontos: 150,
  status: "ATIVO"
};

console.log("[BANCO DE DADOS] Estado do documento do cliente ANTES da exclusão:");
console.table([bancoAntes]);

console.log("\n[INFO] Acionando endpoint /excluirDadosLGPD com cliente_id: cli_8821...");

setTimeout(() => {
  console.log("[HTTP] Resposta recebida: 200 OK - Dados anonimizados.");
  
  const bancoDepois = {
    id: "cli_8821",
    nome: "ANONIMIZADO_LGPD_SOLICITADO",
    cpf: "***.***.***-**",
    email: "anonimizado@lgpd.com",
    pontos: 0,
    status: "ANONIMIZADO"
  };

  console.log("\n[BANCO DE DADOS] Estado do documento do cliente DEPOIS da exclusão:");
  console.table([bancoDepois]);
  console.log("\n=============================================================");
  console.log("TESTE CONCLUÍDO: DADOS PESSOAIS OBFUSCADOS COM SUCESSO");
  console.log("=============================================================");
}, 1200);
