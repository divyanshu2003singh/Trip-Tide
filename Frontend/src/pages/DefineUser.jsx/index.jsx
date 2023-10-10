import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#f0f0f0",
};

const cardStyles = {
  width: "600px",
  padding: "20px",
  borderRadius: "10px",
  background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const optionContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "20px",
};

const optionStyles = {
  flex: 1,
  padding: "20px",
  border: "2px solid transparent", // Transparent border
  borderRadius: "8px",
  cursor: "pointer",
  transition: "border-color 0.3s ease", // Transition border color
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const selectedOptionStyles = {
  ...optionStyles,
  borderColor: "#007bff", // Blue border when selected
};

const labelStyles = {
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center",
};

const emojiStyles = {
  fontSize: "36px",
  marginBottom: "10px",
};

const buttonStyles = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  transition: "background-color 0.3s ease",
  fontSize: "16px",
};

function RoleSelectionCard() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");

  const handleOptionClick = (role) => {
    setSelectedRole(role);
    setError(""); // Clear any previous errors when an option is selected
  };

  const handleContinueClick = () => {
    if (!selectedRole) {
      setError("Please select a role"); // Display an error if no role is selected
    } else {
      setError(""); // Clear any previous errors when "Continue" is clicked
      if (selectedRole === "passenger") {
        navigate("/");
      } else if (selectedRole === "driver") {
        navigate("/rides-near-me");
      }
    }
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h2 style={{ fontSize: "24px" }}>Choose Your Role</h2>
        <div style={optionContainerStyles}>
          <div
            style={
              selectedRole === "passenger"
                ? selectedOptionStyles
                : optionStyles
            }
            onClick={() => handleOptionClick("passenger")}
          >
            <span role="img" aria-label="Passenger" style={emojiStyles}>
              🚶‍♂️
            </span>
            <label style={labelStyles}>I am a passenger</label>
          </div>
          <div
            style={
              selectedRole === "driver"
                ? selectedOptionStyles
                : optionStyles
            }
            onClick={() => handleOptionClick("driver")}
          >
            <span role="img" aria-label="Driver" style={emojiStyles}>
              🚗
            </span>
            <label style={labelStyles}>I am a driver</label>
          </div>
        </div>
        {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
        <button
          style={buttonStyles}
          onClick={handleContinueClick}
          disabled={!selectedRole}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default RoleSelectionCard;
