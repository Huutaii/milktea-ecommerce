import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBogWDXoQctXAAzHsVP8NcS9fx9hsOoJTw",
  authDomain: "odering-website.firebaseapp.com",
  databaseURL: "https://odering-website-default-rtdb.firebaseio.com",
  projectId: "odering-website",
  storageBucket: "odering-website.appspot.com",
  messagingSenderId: "576939303099",
  appId: "1:576939303099:web:fa772f584660999d45c99e"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };
