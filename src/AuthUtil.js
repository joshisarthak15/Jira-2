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
      await signOut(auth); // ✅ Sign out from Firebase

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

      // ✅ Ensure complete logout by reloading the page
      window.location.href = "/login"; // ✅ Redirect to login
  } catch (error) {
      console.error("❌ Sign-out error:", error);
  }
};

 

