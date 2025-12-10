import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CONFIG DO SEU FIREBASE (copiar exatamente a que o painel mostra)
const firebaseConfig = {
  apiKey: "AIzaSyAjygq31ZxYQne-EnCReyMk7YL5OY",
  authDomain: "tempera-rodeo.firebaseapp.com",
  projectId: "tempera-rodeo",
  storageBucket: "tempera-rodeo.firebasestorage.app",
  messagingSenderId: "648927409748",
  appId: "1:648927409748:web:0cbbbbbcc7f3870fabf3f5",
  measurementId: "G-W4Z1HLH4Q2"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// pegar ID do pedido da URL
const urlParams = new URLSearchParams(window.location.search);
const pedidoId = urlParams.get("id");

document.getElementById("pedidoId").textContent = pedidoId;

// Referência do documento
const pedidoRef = doc(db, "orders", pedidoId);

// Escuta em tempo real
onSnapshot(pedidoRef, (snapshot) => {
  if (!snapshot.exists()) {
    alert("Pedido não encontrado!");
    return;
  }

  const data = snapshot.data();

  // Atualiza status
  document.getElementById("pedidoStatus").textContent = data.status;

  // Atualiza itens
  const lista = document.getElementById("pedidoItens");
  lista.innerHTML = "";

  data.itens.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} — ${item.quantidade}x — R$${item.preco}`;
    lista.appendChild(li);
  });

  // total
  document.getElementById("pedidoTotal").textContent = data.total.toFixed(2);

  // data
  document.getElementById("pedidoCriado").textContent =
    data.criadoEm.toDate().toLocaleString();
});
