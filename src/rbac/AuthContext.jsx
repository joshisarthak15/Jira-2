import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../auth"; // Your MSAL configuration
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"; 

const AuthContext = createContext(null);
const msalInstance = new PublicClientApplication(msalConfig);
const db = getFirestore();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {
      await setPersistence(auth, browserLocalPersistence);

      // ✅ Firebase (Google) Authentication
      const unsubscribeFirebase = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          setProvider("Google");
          await fetchUserRole(firebaseUser.email); // ✅ Fetch role for Google users
        } else {
          checkMicrosoftLogin(); // ✅ Only check Microsoft if Firebase user is null
        }
        setLoading(false);
      });

      return () => unsubscribeFirebase();
    };

    checkAuthState();
  }, []);

  // ✅ Check Microsoft Login (Only when Firebase is null)
  const checkMicrosoftLogin = async () => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const activeAccount = accounts[0];
      msalInstance.setActiveAccount(activeAccount);
      setUser(activeAccount);
      setProvider("Microsoft");
      await fetchUserRole(activeAccount.username); // ✅ Fetch role for Microsoft users
    }
    setLoading(false);
  };

  // ✅ Fetch User Role from Firestore
  const fetchUserRole = async (email) => {
    try {
      if (!email) return;
      
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        setUserRole(userDoc.role || "No role assigned");
        console.log(`✅ Role found: ${userDoc.role}`);
      } else {
        setUserRole("No role found");
        console.log("❌ No role found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole("Error fetching role");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, provider, userRole }}>
      {!loading && children} {/* ✅ Prevents blank screen issues */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
