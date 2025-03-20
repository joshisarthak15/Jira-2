import React, { useState, useEffect } from "react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { DefaultButton, IconButton } from "@fluentui/react/lib/Button";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { Callout, DirectionalHint } from "@fluentui/react/lib/Callout";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { SignOutUser } from "../AuthUtil";

initializeIcons();

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [profileTarget, setProfileTarget] = useState(null);
  
  const[userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () =>{
      auth.onAuthStateChanged(async(user) =>{
        console.log(user)
        setUserDetails(user);
      }) 
    };
    useEffect(()=>{
      fetchUserData();
    },[]);
  

  const handleLogout = async () => {
    try {
      const storedMethod = localStorage.getItem("loginMethod");
  
      if (storedMethod === "google") {
         await SignOutUser();
         navigate("/login")
      } 
      else if (storedMethod === "microsoft") {
        if (window.msalInstance) {
          await window.msalInstance.logoutPopup();
          console.log("✅ Microsoft Logout Successful");
        } else {
          console.log("❌ Microsoft Logout Failed: MSAL instance not found");
        }
      } 
      else {
        console.log("❌ No valid login method found.");
      }
  
      
  
      // ✅ Clear local storage (user session)
      localStorage.removeItem("loginMethod");
      localStorage.removeItem("userInfo");
  
      // ✅ Redirect to signup
      navigate("/login");
  
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  };
  
  
  

  const navItems = [
    { key: "yourWork", text: "Your Work", subItems: ["Recent Work", "Starred", "Assigned to You"] },
    { key: "projects", text: "Projects", subItems: ["All Projects", "Favorites", "Archived"] },
    { key: "filters", text: "Filters", subItems: ["My Filters", "Create Filter"] },
    { key: "dashboards", text: "Dashboards", subItems: ["My Dashboards", "Shared Dashboards"] },
    { key: "teams", text: "Teams", subItems: ["Your Team", "Manage Teams"] },
    { key: "plans", text: "Plans", subItems: ["My Plans", "New Plan"] },
    { key: "apps", text: "Apps", subItems: ["Marketplace", "Installed Apps"] },
  ];

  

  return (
    <div style={{ width: "98%", position: "fixed", top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid black", backgroundColor: "white", padding: "12px 20px", zIndex: 1000 }}>
      {/* Logo */}
      <span style={{ fontSize: "20px", fontWeight: "bold", color: "black", display: "flex", alignItems: "center" }}>
        <img
          style={{ objectFit: "contain", height: "20px", width: "25px", marginRight: "8px" }}
          src="https://imgs.search.brave.com/RmTXPR8ikjB1QNvoEAVcV73DSE11AQqeR0-S-tysDfQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWMt/Y2RuLmF0bGFzc2lh/bi5jb20vZGFtL2pj/cjpmYTAxNzU2ZC02/ZGNjLTQ1ZDEtODNh/Yi02OTZmYmZlYjA3/NGYvSmlyYS1pY29u/LWJsdWUuc3ZnP2Nk/blZlcnNpb249MjU3/Ng"
          alt="Jira"
        />
        Jira
      </span>

      {/* Navigation Items */}
      <div style={{ display: "flex", flexGrow: 1, color: "black", justifyContent: "flex-start", gap: "15px", marginLeft: "20px" }}>
        {navItems.map((item) => {
          const dropdownOptions = item.subItems.map((subItem, index) => ({
            key: index,
            text: subItem
          }));

          return (
            <Dropdown
              key={item.key}
              placeholder={item.text}
              options={dropdownOptions}
              styles={{ dropdown: { minWidth: 90, maxWidth: 200 } }}
            />
          );
        })}
        <DefaultButton text="Create" styles={{ root: { backgroundColor: "dodgerblue", color: "white", padding: "5px 10px", borderRadius: "5px" } }} />
      </div>

      {/* Right-side Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <IconButton
          iconProps={{ iconName: "Contact" }}
          title="Profile"
          ariaLabel="Profile"
          onClick={(e) => {
            setProfileOpen(!isProfileOpen);
            setProfileTarget(e.currentTarget);
          }}
        />
      </div>
          
      {/* Profile Dropdown */}
      {isProfileOpen && (
        <Callout
          target={profileTarget}
          onDismiss={() => setProfileOpen(false)}
          directionalHint={DirectionalHint.bottomRightEdge}
          gapSpace={10}
          setInitialFocus
        >
          
          <div style={{ textAlign: "center", padding: "10px" }}>
            
            {userDetails ? (
              
              <Persona
                text={userDetails.displayName}
                secondaryText={userDetails.email}
                size={PersonaSize.size48}
                imageUrl={userDetails.photoURL || "https://via.placeholder.com/150"}
                key={userDetails.uid || userDetails.email}
                onRenderPersonaCoin={() => (
                  <img
                    src={userDetails.photoURL}
                    alt="Profile"
                    style={{ width: 48, height: 48, borderRadius: "50%" }}
                    onError={(e) => {
                      console.error("Image failed to load:", userDetails.photoURL);
                      e.target.src = "https://via.placeholder.com/150"; // Fallback Image
                    }}
                  />
                )}
              />



            ):<p>Loading...</p>}
            
            <hr style={{ borderTop: "1px solid #ddd", margin: "10px 0" }} />
            
            {/* ✅ Display the login method correctly */}

            
            <p style={{ cursor: "pointer", padding: "8px", fontWeight: "bold", color: "#333" }}>Profile</p>
            <p style={{ cursor: "pointer", padding: "8px", fontWeight: "bold", color: "#333" }}>Personal Settings</p>
            <p style={{ cursor: "pointer", padding: "8px", fontWeight: "bold", color: "#333" }}>Notifications</p>
            <p style={{ cursor: "pointer", padding: "8px", fontWeight: "bold", color: "#333" }}>Theme</p>
            <hr style={{ borderTop: "1px solid #ddd", margin: "10px 0" }} />
            <p style={{ cursor: "pointer", padding: "8px", fontWeight: "bold", color: "red" }} onClick={handleLogout}>
              Log Out
            </p>
          </div>
        </Callout>
      )}
    </div>
  );
};

export default Navbar;
