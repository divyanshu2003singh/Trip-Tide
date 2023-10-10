import React, { useState } from "react";
import { Button, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import your custom CSS for styling

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "black", // Black background
};

const leftContainerStyles = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "url('your-image-url.jpg')", // Add your amazing graphic here
  backgroundSize: "cover",
};

const rightContainerStyles = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  maxWidth: "400px",
  background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
};

const inputFieldStyles = {
  marginBottom: "20px", // Add a margin between input fields
};

export default function Signup() {
  let [email, setEmail] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [password, setPassword] = useState("");
  let [optionsList, setoptionsList] = useState([]);
  let [selectedLocationValue, setSelectedLocationValue] = useState("");
  const navigate = useNavigate();

  async function fetchLocations(location) {
    axios
      .get(
        `https://trip-tide-backend.onrender.com/api/common/get-coordinates?location=${location}`
      )
      .then((response) => {
        setoptionsList(response.data.data);
        console.log(response);
      })
      .catch((e) => {
        setoptionsList([]);
      });
  }

  async function signup() {
    axios
      .post("https://trip-tide-backend.onrender.com/api/user/signup", {
        email,
        password,
        firstName,
        lastName,
        currentLocation: {
          type: "Point",
          coordinates: [selectedLocationValue.lat, selectedLocationValue.lon],
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      });
  }

  return (
    <div className="signup-container">
      <h2 className="signup-heading">SIGN UP</h2>
      <TextField
        label="Email"
        variant="filled"
        className="input-field"
        style={inputFieldStyles} // Apply the style here
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        label="First Name"
        variant="filled"
        className="input-field"
        style={inputFieldStyles} // Apply the style here
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <TextField
        label="Last Name"
        variant="filled"
        className="input-field"
        style={inputFieldStyles} // Apply the style here
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <Autocomplete
        options={optionsList}
        getOptionLabel={(option) => option.display_name}
        id="disable-close-on-select"
        clearOnEscape
        className="input-field"
        style={inputFieldStyles} // Apply the style here
        onInput={(event) => {
          fetchLocations(event.target.value);
        }}
        onChange={(event, value) => {
          setSelectedLocationValue(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Address" variant="standard" />
        )}
      />
      <TextField
        label="Password"
        type="password"
        className="input-field"
        style={inputFieldStyles} // Apply the style here
        variant="filled"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button variant="contained" color="primary" onClick={signup}>
        Sign up
      </Button>
    </div>
  );
}
