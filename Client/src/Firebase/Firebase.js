// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzJr97QCPyP9s81ttbCr9hQVoJ5fGU2RI",
  authDomain: "nexedu-b3ba8.firebaseapp.com",
  projectId: "nexedu-b3ba8",
  storageBucket: "nexedu-b3ba8.firebasestorage.app",
  messagingSenderId: "746190261316",
  appId: "1:746190261316:web:53a7647e1495eba2464011",
  measurementId: "G-NH7QXNTX4B",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
