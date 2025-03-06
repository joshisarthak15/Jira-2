import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYLkr2-r7XOKcPzbwOaGmB4xrBNjaCl1Y",
  authDomain: "reactauthproject-17734.firebaseapp.com",
  projectId: "reactauthproject-17734",
  storageBucket: "reactauthproject-17734.firebasestorage.app",
  messagingSenderId: "360993674713",
  appId: "1:360993674713:web:39a26c32a74a9d2c6af5c8",
  measurementId: "G-CXWXQ3BR4S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };

export async function signInWithGoogle() {
  try {
    console.log("🔥 Signing in with Google...");
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    console.log("✅ Google Login Success:", user);

    // ✅ Store login method
    localStorage.setItem("loginMethod", "google");

    // ✅ Store user details (Name, Email, Photo)
    const userInfo = {
      name: user.displayName || "User",
      email: user.email || "No Email",
      photoURL: user.photoURL || "https://via.placeholder.com/150", // Default avatar
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    console.log("✅ User info saved to localStorage:", userInfo);

    return user;
  } catch (error) {
    console.error("❌ Google Sign-In Error:", error);
  }
}
