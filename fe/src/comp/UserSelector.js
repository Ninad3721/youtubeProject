import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import axios from "axios";

function UserSelector() {
  const [selectedUser, setSelectedUser] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const fetchSessionInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/sessionInfo");
      const userData = response.data.data.session.user;
      setId(response.data.data.session.user.id);
      setEmail(response.data.data.session.user.email);
      setRole(response.data.data.session.user.role);
      console.log("id " + response.data.data.session.user.id);
      console.log("email " + response.data.data.session.user.email);
      console.log("role " + response.data.data.session.user.role);
    } catch (error) {
      console.error("Error fetching session info:", error);
    }
  };

  useEffect(() => {
    fetchSessionInfo();
  }, []);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setRole(user);
  };

  const handleButtonClick = async () => {
    console.log(id);
    console.log(email);
    console.log(role);
    const response = await axios.post(
      "http://localhost:3001/user_info",
      {
        id: id,
        email: email,
        role: role,
        username: "test",
      },
      { header: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    console.log(response);
  };

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center">
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
              <p>Selected User: {selectedUser}</p>
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
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserSelector;
