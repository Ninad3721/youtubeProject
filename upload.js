import express from "express";
import "dotenv/config";
import multer from "multer";
import supabase from "./supabaseClient.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${req.id}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/uploadVideo", upload.single("file"), async function (req, res) {
  // try {
  //   // console.log(req.id);
  //   const file = req.file;
  //   const path = req.body.id + "_" + file.originalname;
  //   const { data, error } = await supabase.storage
  //     .from("youtube_layer_video") // Replace with your desired bucket name
  //     .upload(path, file);

  //   if (error) {
  //     res.status(500).json({ error: "Upload failed" });
  //     console.log(error);
  //     return;
  //   }

  //   res.json({ message: "File uploaded successfully!", url: data.publicUrl });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
  const { data, error } = await supabase.auth.refreshSession();
  console.log(data);
  const session = await supabase.auth.getUser();
  console.log(session);
});

export default router;
