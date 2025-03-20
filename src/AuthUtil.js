import { GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";
import { auth } from "./firebase";

export const SignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });
  return signInWithPopup(auth, provider); // Return promise
};
export const SignOutUser = async () => {
    try {
      await signOut(auth);
  
      // ✅ Also sign out from Google session
      if (window.gapi && window.gapi.auth2) {
        const googleAuth = window.gapi.auth2.getAuthInstance();
        if (googleAuth) {
          await googleAuth.signOut();
        }
      }
  
      localStorage.clear();
      sessionStorage.clear();
      console.log("✅ Fully signed out from Firebase and Google");
    } catch (error) {
      console.error("❌ Sign-out error:", error);
    }
  };
 

