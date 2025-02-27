import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "046f463f-e15f-495a-86a4-ec3134439cdc",
    authority: "https://login.microsoftonline.com/d16240c3-f72f-409d-9a6b-497e0afd2d6e",
    redirectUri: "http://localhost:5173",// Adjust based on your app's domain
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

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
    const loginResponse = await msalInstance.loginPopup({
      scopes: ["openid", "profile", "User.Read"],
    });
    console.log("✅ Microsoft Sign-In Success:", loginResponse);
  } catch (error) {
    console.error("❌ Microsoft Sign-In Error:", error);
  }
}
