import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

const videos = [
  {
    id: 1,
    title: "Video Title 1",
    thumbnail: "https://via.placeholder.com/150",
    duration: "5:30",
    views: 1000,
  },
  {
    id: 2,
    title: "Video Title 2",
    thumbnail: "https://via.placeholder.com/150",
    duration: "3:45",
    views: 500,
  },
  {
    id: 3,
    title: "Video Title 2",
    thumbnail: "https://via.placeholder.com/150",
    duration: "3:45",
    views: 500,
  },
  {
    id: 4,
    title: "Video Title 2",
    thumbnail: "https://via.placeholder.com/150",
    duration: "3:45",
    views: 500,
  },
  // Add more video objects as needed
];

const PastVid = () => {
  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
          <Card sx={{ maxWidth: 200, margin: "auto" }}>
            <CardActionArea>
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: "100%" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {video.duration} | Views: {video.views}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PastVid;
