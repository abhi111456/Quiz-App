import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBulAuDCN_n7ECIolyg5Nn8PoKmUBAsryE",
  authDomain: "quiz-login-7158e.firebaseapp.com",
  projectId: "quiz-login-7158e",
  storageBucket: "quiz-login-7158e.appspot.com",
  messagingSenderId: "1051234772971",
  appId: "1:1051234772971:web:dae4dfe1a2f9e87b765bae"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const database = getDatabase(app);

export { app, auth ,database};
