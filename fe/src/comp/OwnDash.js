import React, { useEffect, useState } from "react";
import {
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
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const OwnDash = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getChannelData"
        );

        const tableResponse = await axios.get(
          "http://localhost:5000/listOwnerVideo"
        );
        console.log(tableResponse.data);
        setTableData(tableResponse.data);

        // setChannelData(response.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };
    fetchData();
  }, []);

  const [channelData, setChannelData] = useState({
    image: "https://example.com/youtuber.jpg",
    name: "Example Youtuber",
    subscriberCount: 1000000,
    views: 50000000,
    email: "example@example.com",
  });

  return (
    <div>
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
      <Card
        sx={{
          maxWidth: 800, // Increased width
          margin: "auto",
          marginTop: 20,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Added box shadow
          borderRadius: 4, // Added border radius
          backgroundColor: "#f5f5f5", // Changed background color
        }}
      >
        <CardContent>
          {channelData && (
            <div>
              <img
                src={channelData.image}
                alt="Youtuber"
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: 20,
                  borderRadius: 4, // Added border radius to the image
                }}
              />
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ color: "#333" }} // Changed text color
              >
                {channelData.name}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#666" }} // Changed text color
              >
                Subscribers: {channelData.subscriberCount}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#666" }} // Changed text color
              >
                Views: {channelData.views}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#666" }} // Changed text color
              >
                Email: {channelData.email}
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
      <div>
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
              {tableData.map((row, index) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OwnDash;
