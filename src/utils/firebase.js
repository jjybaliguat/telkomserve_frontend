import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDystoxemuJuTzy-ewqPjfYuKRyFK2i8So",
  authDomain: "rdnaks-website.firebaseapp.com",
  projectId: "rdnaks-website",
  storageBucket: "rdnaks-website.appspot.com",
  messagingSenderId: "409384853492",
  appId: "1:409384853492:web:ddd455cbe9e51dd09de3a1",
  measurementId: "G-PZT2QP4BMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
export {storage, db}