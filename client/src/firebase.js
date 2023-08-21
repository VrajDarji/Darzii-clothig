import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApHZR_5iwKhDIC79-iJuKDcJeeStIjOh8",
  authDomain: "clothing-site-2186b.firebaseapp.com",
  projectId: "clothing-site-2186b",
  storageBucket: "clothing-site-2186b.appspot.com",
  messagingSenderId: "1086049640918",
  appId: "1:1086049640918:web:c894c83ce0cc26ea264477",
  measurementId: "G-H225GRBXCX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
