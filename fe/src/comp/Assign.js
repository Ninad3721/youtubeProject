import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const Assign = (props) => {
  const [editorEmail, setEditorEmail] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:5000/assignEditor",
      {
        editor_email: editorEmail,
        video_id: videoId,
      },
      {
        headers: { "Content-Type": "application/www-form-urlencoded" },
      }
    );

    console.log(response.data);
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
              Assign Video
            </Typography>
            <div>
              <TextField
                label="Editor Email"
                fullWidth
                // value={}
                onChange={(e) => {
                  setEditorEmail(e.target.value);
                }}
                sx={{ marginY: 1 }}
              />

              <TextField
                label="Video Id"
                fullWidth
                // value={props.videoId}
                onChange={(e) => {
                  setVideoId(e.target.value);
                }}
                sx={{ marginY: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ marginTop: 2 }}
                fullWidth
              >
                Assign
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Assign;
