import React, { useEffect, useState } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  Table,
  TableBody,
  TableRow,
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
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Video ID</TableCell>
              <TableCell>Video Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assign</TableCell>
              <TableCell>Editor Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.video_name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onCLick={() => {
                      Navigate("/assign-video");
                    }}
                  >
                    Assign
                  </Button>
                </TableCell>
                <TableCell>{row.editor_email}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EdiDash;
