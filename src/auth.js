import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "b3c8c04d-8739-4362-b591-fb39f6cae895",
    authority: "https://login.microsoftonline.com/d16240c3-f72f-409d-9a6b-497e0afd2d6e",
    redirectUri: "http://localhost:5173",// Adjust based on your app's domain
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

// 🔥 Initialize MSAL before calling it
async function initializeMSAL() {
  try {
    await msalInstance.initialize();
    console.log("✅ MSAL Initialized Successfully!");
  } catch (error) {
    console.error("❌ MSAL Initialization Failed:", error);
  }
}

initializeMSAL(); // Call this at the start

export async function signInWithMicrosoft() {
  try {
    console.log("🔥 Signing in with Microsoft...");
    const loginResponse = await msalInstance.loginPopup({
      scopes: ["openid", "profile", "User.Read"],
      prompt: "select_account",
    });

    console.log("✅ Microsoft Login Success:", loginResponse);
    localStorage.setItem("loginMethod", "microsoft");
    console.log("✅ User saved to sessionStorage");

    return loginResponse;
  } catch (error) {
    console.error("❌ Microsoft Sign-In Error:", error);
  }
}





