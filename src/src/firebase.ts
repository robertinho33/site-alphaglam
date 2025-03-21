import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "alphaglamstart.firebaseapp.com",
  databaseURL: "https://alphaglamstart-default-rtdb.firebaseio.com",
  projectId: "alphaglamstart",
  storageBucket: "alphaglamstart.appspot.com",
  messagingSenderId: "885178660314",
  appId: "1:885178660314:web:1bb3a78be9fa7fdcdefce3",
  measurementId: "G-094SYXW35Q",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
