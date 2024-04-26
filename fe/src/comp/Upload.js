import React, { useRef } from "react";

const Upload = () => {
  const inputRef = useRef(null);

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

      const response = await fetch("http://localhost:1024/uploadVideo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
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
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
};

export default Upload;
