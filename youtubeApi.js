import express from "express";
import { google } from "googleapis";

import "dotenv/config";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uri
);

router.get("/videos", (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
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
      let token = await oauth2Client.getToken(req.query.code);
      oauth2Client.setCredentials(token);
      console.log(token.res.data.access_token);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/test", (req, res) => {
  res.send("foo bar");
});

export default router;
