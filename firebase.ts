import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyBOpLx0XhWe8_AJ0-twauxdZXmkGqTnUjY",
  authDomain: "singladental-db892.firebaseapp.com",
  projectId: "singladental-db892",
  storageBucket: "singladental-db892.firebasestorage.app",
  messagingSenderId: "1097784304889",
  appId: "1:1097784304889:web:b809b0c122fba7cc6aae28"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);