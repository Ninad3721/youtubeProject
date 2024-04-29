import React, { useRef } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const Upload = () => {
  const inputRef = useRef(null);
  const [ownerEmail, setOwnerEmail] = React.useState("");
  const [editorEmail, setEditorEmail] = React.useState("");

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
    <div className="upload-container">
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
      <Button variant="contained" onClick={handleUpload} sx={{ marginTop: 2 }}>
        Submit
      </Button>
    </div>
  );
};

export default Upload;
