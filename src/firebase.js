import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { setPersistence,browserLocalPersistence } from "firebase/auth";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYLkr2-r7XOKcPzbwOaGmB4xrBNjaCl1Y",
  authDomain: "reactauthproject-17734.firebaseapp.com",
  projectId: "reactauthproject-17734",
  storageBucket: "reactauthproject-17734.firebasestorage.app",
  messagingSenderId: "360993674713",
  appId: "1:360993674713:web:39a26c32a74a9d2c6af5c8",
  measurementId: "G-CXWXQ3BR4S",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("✅ Firebase persistence set to Local"))
  .catch((error) => console.error("❌ Persistence error:", error));

export default app;

