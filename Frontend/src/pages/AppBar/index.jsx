import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function CustomAppBar() {
    const [cookies, removeCookies] = useCookies();
    const navigate = useNavigate();

    // Initialize isLoggedIn state based on the presence of auth_token
    const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.auth_token);

    async function logout() {
        if (isLoggedIn) {
            await removeCookies("auth_token");
            setIsLoggedIn(false); // Update isLoggedIn state
            navigate("/signup");
        }
    }

    useEffect(() => {
        // Update isLoggedIn state when the component mounts
        setIsLoggedIn(!!cookies.auth_token);
    }, [cookies.auth_token]);

    return (
        <AppBar position="fixed" style={{ background: "black" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TripTide
                </Typography>
                {isLoggedIn && (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
