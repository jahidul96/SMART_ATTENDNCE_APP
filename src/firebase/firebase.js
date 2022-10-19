// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-GG5YjWSKqAnalhkFGOCw2I0bp-uDHH0",
  authDomain: "attendence-bff21.firebaseapp.com",
  projectId: "attendence-bff21",
  storageBucket: "attendence-bff21.appspot.com",
  messagingSenderId: "447680457137",
  appId: "1:447680457137:web:799389a37bb4bd47fab590",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
