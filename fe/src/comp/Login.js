import React, { useState } from "react";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await fetch("http://localhost:1024/signinWithPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response.ok);
      console.log(response);
      if (response.ok) {
        console.log("if");
        const data = await response.text();
        console.log(data);
      } else {
        console.log("else");
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    console.log(process.env.BACKEND_URL),
    (
      <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography
                variant="h5"
                component="h1"
                align="center"
                gutterBottom
              >
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  );
};

export default Login;
