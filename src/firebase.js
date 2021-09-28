import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD6gU-BILtZm6ELqDGOwZJjm6h98NJ94AE",
  authDomain: "lwongconsulting-37781.firebaseapp.com",
  projectId: "lwongconsulting-37781",
  storageBucket: "lwongconsulting-37781.appspot.com",
  messagingSenderId: "662289052960",
  appId: "1:662289052960:web:40cebe296add3bcf251345",
  measurementId: "G-3BYV9G8KW9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
