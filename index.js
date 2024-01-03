import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import youtubeApi from "./youtubeApi.js";
// import youtubeApi from "./youtubeApi.js";

const app = express();
const port = process.env.portnumber;
const prisma = new PrismaClient();

app.use("/api", youtubeApi);

//route after logging in the user first time to collect the info
app.get("/user_info", async (req, res) => {
  const user = await prisma.user_info.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    res.send("Email Id already exsist");
  } else {
    await prisma.user_info.create({
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
    });
  }
});

app.listen(port, () => {
  console.log("Started Application on " + port);
});
