import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../auth"; // Your MSAL configuration

const AuthContext = createContext(null);
const msalInstance = new PublicClientApplication(msalConfig);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null); // Track provider type

  useEffect(() => {
    const checkAuthState = async () => {
      await setPersistence(auth, browserLocalPersistence); // Firebase persistence

      // 🔹 Google (Firebase) Auth
      const unsubscribeFirebase = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          setProvider("Google");
          setLoading(false);
        } else {
          checkMicrosoftLogin(); // If not Google, check MSAL
        }
      });

      return () => unsubscribeFirebase();
    };

    checkAuthState();
  }, []);

  // 🔹 Microsoft (MSAL) Auth - Restore Session After Reload
  const checkMicrosoftLogin = async () => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const activeAccount = accounts[0];
      msalInstance.setActiveAccount(activeAccount); // Set active account for persistence
      setUser(activeAccount);
      setProvider("Microsoft");
    } else {
      setUser(null);
      setProvider(null);
    }
    setLoading(false);
  };

  // 🔹 Sign Out Function (Handles Both Google & Microsoft)
  const signOut = async () => {
    if (provider === "Google") {
      await firebaseSignOut(auth);
    } else if (provider === "Microsoft") {
      await msalInstance.logoutPopup(); // Ensures Microsoft logout works properly
    }
    setUser(null);
    setProvider(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, provider, signOut }}>
      {!loading && children} {/* ✅ Prevent rendering blank page */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
