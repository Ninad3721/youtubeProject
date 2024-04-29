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

const Upload = () => {
  const inputRef = useRef(null);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [editorEmail, setEditorEmail] = useState("");

  const handleUpload = async () => {
    const files = inputRef.current.files;
    if (!files.length) return;

    const file = files[0];

    // Ensure the selected file is a video
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("owner_email", ownerEmail);
      formData.append("editor_email", editorEmail);

      const response = await axios.post(
        "http://localhost:3001/uploadVideo",
        formData
      );
      if (response.status === 200) {
        alert("Video uploaded successfully!");
      } else {
        alert("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("An error occurred while uploading the video.");
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
              Upload
            </Typography>
            <div>
              <input ref={inputRef} type="file" accept="video/*" />
              <TextField
                label="Owner Email"
                fullWidth
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                sx={{ marginY: 1 }}
              />
              <TextField
                label="Editor Email"
                fullWidth
                value={editorEmail}
                onChange={(e) => setEditorEmail(e.target.value)}
                sx={{ marginY: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleUpload}
                sx={{ marginTop: 2 }}
                fullWidth
              >
                Submit
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Upload;
