import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserSelector() {
  const [selectedUser, setSelectedUser] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const fetchSessionInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sessionInfo");
      const userData = response.data.data.session.user;
      setId(response.data.data.session.user.id);
      setEmail(response.data.data.session.user.email);
      console.log("id " + response.data.data.session.user.id);
      console.log("email " + response.data.data.session.user.email);
    } catch (error) {
      console.error("Error fetching session info:", error);
    }
  };

  useEffect(() => {
    fetchSessionInfo();
  }, []);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    if (user === "owner") {
      setRole(true);
    } else {
      setRole(false);
    }
  };

  const handleButtonClick = async () => {
    console.log(id);
    console.log(email);
    console.log(role);

    try {
      const response = await axios.post(
        "http://localhost:5000/user_info",
        {
          id: id,
          email: email,
          isOwner: role,
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response);

      // Check if the status code is 200
      if (response.status === 200) {
        // Redirect based on the role
        if (role === true) {
          axios.get("http://localhost:5000/videos", {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
        } else if (role === false) {
          navigate("/edidash");
        }
      }
    } catch (error) {
      console.error("Error posting user info:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xl" sx={{ height: "100px" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Paper elevation={3} sx={{ padding: 10 }}>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Role Selection
            </Typography>
            <Card>
              <CardContent>
                <p>Select your role </p>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width={"200px"}
                >
                  <ButtonGroup>
                    <Button
                      variant={
                        selectedUser === "owner" ? "contained" : "outlined"
                      }
                      color="primary"
                      onClick={() => handleUserSelection("owner")}
                    >
                      Owner
                    </Button>
                    <Button
                      variant={
                        selectedUser === "editor" ? "contained" : "outlined"
                      }
                      color="primary"
                      onClick={() => handleUserSelection("editor")}
                    >
                      Editor
                    </Button>
                  </ButtonGroup>
                </Box>
                {selectedUser === "editor" ? (
                  <p>
                    Editor is one who get to edits the videos uploded by the
                    owner
                  </p>
                ) : (
                  <p>
                    Owner is one who will be assigning th e video to the editor
                    and should have an youtube account
                  </p>
                )}
                <p>Enter your username</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick}
                  >
                    Next
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserSelector;
