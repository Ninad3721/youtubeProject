import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const OwnDash = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#2196f3" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Channel Info
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/assign-video">
          Assign Video
        </Button>
        <Button color="inherit" component={Link} to="/upload">
          Upload
        </Button>
        <Button color="inherit" component={Link} to="/past-videos">
          Past Videos
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default OwnDash;
