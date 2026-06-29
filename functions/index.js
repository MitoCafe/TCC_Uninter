const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// webhook que simula o pagamento do pix (recebe o POST e atualiza no firestore)
exports.webhookPagamento = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { pedido_id, gateway_ref, status } = req.body;

  if (!pedido_id || !status) {
    return res.status(400).send({ error: "Missing payload" });
  }

  try {
    const pedidoRef = db.collection("pedidos").doc(String(pedido_id));
    
    console.log("webhook recebeu o pedido: ", pedido_id);
    console.log("status recebido: ", status);
    
    // validacao simples de teste (pra garantir)
    if (status === "APPROVED" || status === "approved") {
      console.log("pagamento aprovado, mandando pra cozinha");
    }

    // atualiza o pedido pra APPROVED e libera pra cozinha
    await pedidoRef.set({
      pagamento_status: status, // ex: 'APPROVED'
      status_preparo: "PREPARANDO",
      atualizado_em: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    functions.logger.info(`Pagamento aprovado para pedido ${pedido_id}`);
    
    return res.status(200).send({ success: true, pedido_id, status: "PREPARANDO" });
  } catch (error) {
    functions.logger.error("Erro no webhook:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// felipe: rota pra anonimizar os dados do cliente por causa da LGPD
// quando o usuario pedir pra excluir a conta, a gente limpa os dados sensiveis no banco
exports.excluirDadosLGPD = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { cliente_id } = req.body;

  if (!cliente_id) {
    return res.status(400).send({ error: "cliente_id eh obrigatorio" });
  }

  try {
    console.log("iniciando exclusao lgpd do cliente:", cliente_id);
    const clienteRef = db.collection("clientes").doc(String(cliente_id));

    // substitui os dados reais por asterisco pra nao dar ruim com a LGPD
    await clienteRef.set({
      nome: "ANONIMIZADO_LGPD_SOLICITADO",
      cpf: "***.***.***-**",
      status: "ANONIMIZADO",
      data_exclusao: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log("cliente anonimizado com sucesso!");
    return res.status(200).send({ success: true, message: "Dados apagados/anonimizados conforme LGPD" });
  } catch (error) {
    console.error("erro ao apagar dados do cliente:", error);
    return res.status(500).send({ error: "Erro interno no servidor" });
  }
});

