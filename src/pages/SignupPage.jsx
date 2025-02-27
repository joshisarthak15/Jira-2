import React from "react";
import "./AuthPage.css";
import { TextField, PrimaryButton, DefaultButton, Stack } from "@fluentui/react";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { signInWithMicrosoft } from "../auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/dashboard");
  };

  const handleMicrosoftSignup = async () => {
    const user = await signInWithMicrosoft();
    if (user) navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Stack
          tokens={{ childrenGap: 15 }}
          styles={{ root: { textAlign: "center" } }}
        >
          <h2>All great projects start with Jira</h2>
          <TextField label="Work email" placeholder="you@company.com" />
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
