// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAG2_3__4T7MVMReR5S9KumcHTjXS8DBX8",
  authDomain: "nexedu-ea30f.firebaseapp.com",
  projectId: "nexedu-ea30f",
  storageBucket: "nexedu-ea30f.firebasestorage.app",
  messagingSenderId: "186428591469",
  appId: "1:186428591469:web:af6ca30a3be9fd02565e64",
  measurementId: "G-YZ46HX5NL5",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
