import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const EdiDash = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      videoName: "Introduction to React",
      editorName: "John Doe",
      status: "In Progress",
      createdAt: "2023-04-28",
    },
    {
      id: 2,
      videoName: "JavaScript Fundamentals",
      editorName: "Jane Smith",
      status: "Completed",
      createdAt: "2023-04-25",
    },
    {
      id: 3,
      videoName: "CSS Animations",
      editorName: "Michael Johnson",
      status: "Pending Review",
      createdAt: "2023-04-27",
    },
  ]);

  const editorEmail = "editor@example.com"; // Dummy editor email

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/listEditorVideo"
        );
        // setVideos(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#2196f3" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              Editor Info
            </Typography>
            <Typography variant="body1" component="div" sx={{ ml: 1 }}>
              ({editorEmail})
            </Typography>
          </Box>
          <Button color="inherit" component={Link} to="/assign-video">
            Assign Videos
          </Button>
          <Button color="inherit" component={Link} to="/upload">
            Upload
          </Button>
          <Button color="inherit" component={Link} to="/past-videos">
            Past Videos
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card
              sx={{
                maxWidth: 400,
                margin: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: 4,
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ color: "#333" }}
                >
                  {video.videoName}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: "#666" }}>
                  Editor: {video.editorName}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: "#666" }}>
                  Status: {video.status}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: "#666" }}>
                  Created At: {video.createdAt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EdiDash;
