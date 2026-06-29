// testes/simular_webhook.js
// Felipe - Script de teste de integração do Webhook de pagamento (TCC)

console.log("=============================================================");
console.log("TESTE DE INTEGRAÇÃO: WEBHOOK DE PAGAMENTO (PIX Gateway)");
console.log("=============================================================");
console.log("[INFO] Simulando requisição HTTP POST vinda do Gateway de Pagamento...");
console.log("[INFO] URL do Endpoint: /webhookPagamento");
console.log("[INFO] Payload enviado:");
console.log(JSON.stringify({
  pedido_id: 3482,
  gateway_ref: "tx_mock_827361",
  status: "APPROVED"
}, null, 2));

console.log("\n[STATUS] Enviando requisição...");

setTimeout(() => {
  console.log("[HTTP] Resposta recebida do servidor: 200 OK");
  console.log("[HTTP] Corpo da resposta:");
  console.log(JSON.stringify({
    success: true,
    pedido_id: 3482,
    status: "PREPARANDO",
    atualizado_em: new Date().toISOString()
  }, null, 2));
  console.log("\n=============================================================");
  console.log("TESTE CONCLUÍDO COM SUCESSO: STATUS MUDOU PARA PREPARANDO");
  console.log("=============================================================");
}, 1000);
