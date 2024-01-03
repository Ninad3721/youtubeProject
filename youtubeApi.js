import express from "express";
import { google } from "googleapis";
import "dotenv/config";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uri
);

const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});

console.log(authorizationUrl);

router.get("/videos", (req, res) => {});

export default router;
