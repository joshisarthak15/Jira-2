import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { msalInstance } from "../auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar"; // Import Navbar
import "./AuthPage.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 Checking localStorage and sessionStorage...");

    const firebaseUser = localStorage.getItem("firebaseUser");
    if (firebaseUser) {
      try {
        const parsedUser = JSON.parse(firebaseUser);
        console.log("✅ Google User:", parsedUser);
        setUser(parsedUser);
        return;
      } catch (error) {
        console.error("❌ Error parsing Google user:", error);
      }
    }

    const msUser = sessionStorage.getItem("msalUser");
    if (msUser) {
      try {
        const parsedMsUser = JSON.parse(msUser);
        console.log("✅ Microsoft User:", parsedMsUser);
        setUser(parsedMsUser.account);
      } catch (error) {
        console.error("❌ Error parsing Microsoft user:", error);
      }
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar /> {/* Include Navbar here */}
      <h2>Welcome to the Dashboard!</h2>
      <p>This is your main dashboard content.</p>
    </div>
  );
};

export default Dashboard;
