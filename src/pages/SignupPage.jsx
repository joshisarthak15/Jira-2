import React from "react";
import "./AuthPage.css";
import { TextField, PrimaryButton, DefaultButton, Stack } from "@fluentui/react";
import { signInWithMicrosoft } from "../auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignInWithGoogle } from "../AuthUtil";

async function addObjectToFirestore(collectionName, data) {
  try {
      // Define the query to check for existing documents with the same values
      const q = query(collection(db, collectionName), where("email", "==", data.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          console.log("Duplicate entry detected. Document not added.");
          return null;
      }

      // Add a default role field if not provided
      const dataWithRole = { ...data, role: "user" };

      // Add the document to Firestore
      const docRef = await addDoc(collection(db, collectionName), dataWithRole);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
  } catch (e) {
      console.error("Error adding document: ", e);
  }
}

const SignupPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    
    try {
      const result = await SignInWithGoogle(); // ✅ Call the function properly
      console.log(result);
      addObjectToFirestore("users", { name: result.user.displayName, email: result.user.email});
      localStorage.setItem("loginMethod", "google");
      navigate("/dashboard"); // ✅ Redirect after successful login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleMicrosoftSignup = async () => {
    console.log("🔥 Attempting Microsoft Signup...");
    try {
      const user = await signInWithMicrosoft();

      if (user) {
        console.log("✅ Microsoft Signup Success:", user);
        addObjectToFirestore("users", { name: user.idTokenClaims.name, email: user.idTokenClaims.preferred_username });
        // ✅ Store login method
        localStorage.setItem("loginMethod", "microsoft");

        // ✅ Store user info
        const userInfo = {
          name: user.account.name || "User",
          email: user.account.username || "No Email",
          photoURL: user.account.idTokenClaims?.picture || "https://via.placeholder.com/150",
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        console.log("✅ Stored Microsoft User Info in localStorage:", userInfo);
        navigate("/dashboard");
      } else {
        console.log("❌ Microsoft Signup Failed - No User Data");
      }
    } catch (error) {
      console.error("❌ Microsoft Signup Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Stack
          tokens={{ childrenGap: 15 }}
          styles={{ root: { textAlign: "center" } }}
        >
          <h2>All great projects start with Jira</h2>
          <TextField label="Work email" placeholder="Enter your work email" />
          <PrimaryButton text="Sign up" />
          <DefaultButton text="Login" onClick={() => navigate("/login")} />
          <h4>Or continue with</h4>
          <DefaultButton text="Google" onClick={handleGoogleSignIn} />
          <DefaultButton text="Microsoft" onClick={handleMicrosoftSignup} />
        </Stack>
      </div>
    </div>
  );
};

export default SignupPage;
