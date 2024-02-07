import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import youtubeApi from "./youtubeApi.js";
import upload from "./upload.js";
import bodyParser from "body-parser";
import supabase from "./supabaseClient.js";
// import youtubeApi from "./youtubeApi.js";

const app = express();
const port = process.env.portnumber;
const prisma = new PrismaClient();

app.use("/", youtubeApi);
app.use("/", upload);
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });
    if (error) {
      res.send(error.message);
    } else {
      console.log(data);
      res.send("You logged in successfully");
      res.status(200);
    }
  } catch (error) {
    res.send(error);
  }
});

app.post("/signinWithPassword", async function (req, res) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    });
    if (error) {
      res.send(error.message);
    } else {
      console.log(data);
      res.send("You signed in successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/home", (req, res) => {
  res.send("home");
});

app.get("/signinWithGoogle", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    res.redirect(data.url);
    // res.send("You logged in successfully");
  } catch (error) {
    res.send("Error" + error);
  }
});
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
