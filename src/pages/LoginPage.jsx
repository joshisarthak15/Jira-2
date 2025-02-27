import React from "react";
import "./AuthPage.css";
import { TextField, PrimaryButton, DefaultButton, Checkbox, Stack } from "@fluentui/react";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { signInWithMicrosoft } from "../auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/dashboard");
  };

  const handleMicrosoftLogin = async () => {
    const user = await signInWithMicrosoft();
    if (user) navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { textAlign: "center" } }}>
          <h2>Log in to continue</h2>
          <TextField label="Enter your email" />
          <Checkbox label="Remember me" />
          <PrimaryButton text="Continue" />
          <h4>Or continue with</h4>
          <DefaultButton text="Google" onClick={handleGoogleLogin} />
          <DefaultButton text="Microsoft" onClick={handleMicrosoftLogin} />
          <DefaultButton text="Apple" />
          <DefaultButton text="Slack" />
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
