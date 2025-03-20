import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { msalInstance } from "../auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar"; // Import Navbar
import "./AuthPage.css";

const Dashboard = () => {
  

  return (
    <div className="dashboard-container">
      <Navbar /> {/* Include Navbar here */}
      <h2>Welcome to the Dashboard!</h2>
      <p>This is your main dashboard content.</p>
    </div>
  );
};

export default Dashboard;
