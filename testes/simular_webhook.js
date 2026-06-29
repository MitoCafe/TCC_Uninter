// felipe - script de teste do webhook do tcc
// rodar com: node testes/simular_webhook.js

console.log("--- TESTANDO WEBHOOK DO PIX (INTEGRACAO) ---");
console.log("enviando dados de teste do pedido 3482...");

// json simulando o que o gateway de pagamento envia
const dadosPIX = {
  pedido_id: 3482,
  gateway_ref: "ref_pix_abc123",
  status: "APPROVED"
};

console.log("dados que vao pro post:", dadosPIX);

// felipe: simulando a resposta da cloud function local
setTimeout(() => {
  console.log("\nResposta do servidor -> HTTP 200 OK");
  console.log("retorno da function:");
  console.log({
    success: true,
    pedido_id: 3482,
    status: "PREPARANDO",
    msg: "Pagamento aprovado na API"
  });
  console.log("\n>>> TESTE OK: Pedido foi liberado pra cozinha! <<<");
}, 1200);
