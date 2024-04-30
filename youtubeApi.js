import express, { response } from "express";
import { google } from "googleapis";
import "dotenv/config";
import axios from "axios";
import supabase from "./supabaseClient.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const oauth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uri
);

let token;
router.get("/videos", (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "online",
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
  });

  res.writeHead(301, { Location: authorizationUrl });
  res.end();
  console.log("done");
});

router.get("/auth?", async (req, res) => {
  try {
    if (req.query.error) {
      res.send("Error: " + req.query.error);
      res.status(401);
    } else {
      token = await oauth2Client.getToken(req.query.code);
      oauth2Client.setCredentials(token);
      console.log(token.res.data.access_token);
      // await sessionStorage.setItem("access_token", token);
      res.header("Access-Control-Allow-Origin", "http://localhost:3000/videos");
      res.send("Token generated successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/userChannelInfo", async (req, res) => {
  //   try {
  //     // const accessToken = await getAccessTokenFromUser(oauth2Client);
  //     const youtube = google.youtube({ version: "v3", auth: token });
  //     const response = await youtube.channels.list({
  //       part: "snippet,statistics",
  //       mine: true, // Retrieve the authenticated user's channel
  //     });
  //     const storage = multer.diskStorage({
  //   destination: "uploads/",
  //   filename: (req, file, cb) => {
  //     cb(null, `${req.id}-${Date.now()}-${file.originalname}`);
  //   },
  // });
  //     const channel = response.data.items[0];
  //     res.json(channel);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Error fetching channel information");
  //   }
});

//using axios
router.get("/getChannelData", async (req, res) => {
  try {
    const token = req.body.access_token;
    console.log(process.env.google_api_key);
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${process.env.google_api_key}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseArray = [];
    await response.data.items.map((item) => {
      responseArray.push({
        id: item.id,
        channelName: item.snippet.title,
        channelDescription: item.snippet.description,
        channelProfilePicture: item.snippet.thumbnails.default.url,
        totalViews: item.statistics.viewCount,
        totalVideos: item.statistics.videoCount,
      });
    });
    res.send(responseArray);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.post("/uplaoadVideoOnYoutube", async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .from("youtube_layer_video")
      .getPublicUrl("12345hfdh_big_buck_bunny_720p_1mb.mp4");

    if (error) {
      console.error("Error generating temporary URL:", error);
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
