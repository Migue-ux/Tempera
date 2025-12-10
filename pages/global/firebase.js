// Import do Firebase (versão CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9xqY3L9n21noCReHJy7oKL5OY",
  authDomain: "temperao-rodoelo.firebaseapp.com",
  projectId: "temperao-rodoelo",
  storageBucket: "temperao-rodoelo.appspot.com",
  messagingSenderId: "649874920744",
  appId: "1:649874920744:web:0cdbe0bbc7a3f78f0a8fa5",
  measurementId: "G-V4PKLHH4Q2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
