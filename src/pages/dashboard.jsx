import React, { useEffect, useState } from "react";
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
