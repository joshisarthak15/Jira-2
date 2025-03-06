import React from "react";
import "./AuthPage.css";
import { TextField, PrimaryButton, DefaultButton, Stack } from "@fluentui/react";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { signInWithMicrosoft } from "../auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    console.log("🔥 Attempting Google Signup...");
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      if (user) {
        console.log("✅ Google Signup Success:", user);

        // ✅ Store login method
        localStorage.setItem("loginMethod", "google");

        // ✅ Store user info
        const userInfo = {
          name: user.displayName || "User",
          email: user.email || "No Email",
          photoURL: user.photoURL || "https://via.placeholder.com/150",
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        console.log("✅ Stored Google User Info in localStorage:", userInfo);
        navigate("/dashboard");
      } else {
        console.log("❌ Google Signup Failed - No User Data");
      }
    } catch (error) {
      console.error("❌ Google Signup Error:", error);
    }
  };

  const handleMicrosoftSignup = async () => {
    console.log("🔥 Attempting Microsoft Signup...");
    try {
      const user = await signInWithMicrosoft();

      if (user) {
        console.log("✅ Microsoft Signup Success:", user);

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
          <DefaultButton text="Google" onClick={handleGoogleSignup} />
          <DefaultButton text="Microsoft" onClick={handleMicrosoftSignup} />
        </Stack>
      </div>
    </div>
  );
};

export default SignupPage;
