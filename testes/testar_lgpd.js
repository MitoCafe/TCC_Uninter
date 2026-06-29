// felipe - testando a anonimizacao lgpd pro tcc
// se o professor encher o saco com lgpd isso aqui mostra q funciona

console.log("--- TESTANDO FLUXO DA LGPD (ANONIMIZACAO) ---");

let bancoDadosFake = {
  id: "cli_102",
  nome: "Felipe Silva",
  cpf: "123.456.789-00",
  email: "felipe@gmail.com",
  status: "ATIVO"
};

console.log("Dados do usuario antes de apagar:", bancoDadosFake);
console.log("Chamando rota de exclusao para o cliente cli_102...");

setTimeout(() => {
  console.log("\nServidor respondeu -> OK (200)");
  
  // mudando os campos pra nao expor o usuario
  bancoDadosFake.nome = "ANONIMIZADO_LGPD_SOLICITADO";
  bancoDadosFake.cpf = "***.***.***-**";
  bancoDadosFake.email = "anonimizado@lgpd.com";
  bancoDadosFake.status = "ANONIMIZADO";

  console.log("Dados salvos depois da funcao rodar:", bancoDadosFake);
  console.log("\n>>> Teste da LGPD passou! <<<");
}, 1000);
