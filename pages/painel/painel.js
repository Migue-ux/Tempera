import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, collection, onSnapshot, updateDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const lista = document.getElementById("listaPedidos");

// ouvir pedidos em tempo real
onSnapshot(collection(db, "orders"), (snapshot) => {
  lista.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>Pedido: ${docSnap.id}</h3>
      <p><strong>Cliente:</strong> ${data.clienteNome}</p>
      <p><strong>Status:</strong> ${data.status}</p>

      <button data-id="${docSnap.id}" data-status="em preparo">Em preparo</button>
      <button data-id="${docSnap.id}" data-status="saiu para entrega">Saiu para entrega</button>
      <button data-id="${docSnap.id}" data-status="entregue">Entregue</button>
    `;

    lista.appendChild(card);
  });

  // ativar botões
  document.querySelectorAll("button").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.getAttribute("data-id");
      const novoStatus = btn.getAttribute("data-status");

      await updateDoc(doc(db, "orders", id), { status: novoStatus });
    };
  });
});
