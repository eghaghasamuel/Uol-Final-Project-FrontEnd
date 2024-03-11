import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
const googleAuth = () => {
  window.open(
    `${process.env.REACT_APP_API_URL}/auth/google/callback`,
    "_self"
  );
};
const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      // Send POST request to /register
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: formData.get("email"),
          password: formData.get("password"),
          
        },
        {
          withCredentials: true, // Include this option
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.open(
      `/`,
      "_self"
    );
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Registration failed:", error.message);
    }
  };
export default function Signin() {
  
  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            onClick={googleAuth}
          >
            Sign in with google
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}