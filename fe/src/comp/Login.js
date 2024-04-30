import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log(typeof process.env.REACT_APP_BACKEND_URL);
    console.log(typeof email);
    console.log(typeof password);
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(process.env.REACT_APP_BACKEND_URL);

    try {
      const response = await axios.post(
        `http://localhost:5000/signinWithPassword`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const data = await response.data;
      console.log("Success:", data);

      // Check if the status code is 200
      if (response.status === 200) {
        // Redirect to another route
        navigate("/ownDash");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>

            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
