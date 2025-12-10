import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjygq31ZxYQne-EnCReyMk7YL5OY",
  authDomain: "tempera-rodeo.firebaseapp.com",
  projectId: "tempera-rodeo",
  storageBucket: "tempera-rodeo.firebasestorage.app",
  messagingSenderId: "648927409748",
  appId: "1:648927409748:web:0cbbbbbcc7f3870fabf3f5",
  measurementId: "G-W4Z1HLH4Q2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("btnFinalizar").addEventListener("click", async () => {

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const itens = JSON.parse(document.getElementById("itens").value);
  const total = Number(document.getElementById("total").value);

  if (!nome || !endereco || !total) {
    alert("Preencha tudo!");
    return;
  }

  const docRef = await addDoc(collection(db, "orders"), {
    clienteNome: nome,
    clienteEndereco: endereco,
    itens: itens,
    total: total,
    status: "recebido",
    criadoEm: Timestamp.now()
  });

  // redirecionar para o rastreamento
  window.location.href = `/pages/pedido/pedido.html?id=${docRef.id}`;
});
