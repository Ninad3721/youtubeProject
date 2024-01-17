import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import youtubeApi from "./youtubeApi.js";
import router from "./routes/index.js";

const app = express();
const port = process.env.portnumber;
const prisma = new PrismaClient();

// Prisma client initialization
const initPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected to the database");
  } catch (error) {
    console.error("Prisma connection error:", error);
  }
};

// Initialize Prisma and start the application
initPrisma().then(() => {
  app.use(express.json());

  app.use("/api", youtubeApi);
  app.use("/api", router);

  app.post("/insertSampleData", async (req, res) => {
    try {
      // Insert sample data into user_info table
      await prisma.user_info.create({
        data: {
          id: 1,
          email: "sample@email.com",
          name: "John Doe",
          login_time: new Date(),
          last_logged: new Date(),
          role: "user",
        },
      });

      res.status(200).send("Sample data inserted successfully");
    } catch (error) {
      console.error("Error inserting sample data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Route to check if email exists in user_info table
  app.post("/user_info", async (req, res) => {
    try {
      // Check if email exists in Prisma
      const user = await prisma.user_info.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        res.status(400).send("Email ID already exists");
      } else {
        // Create user in Prisma
        await prisma.user_info.create({
          data: {
            email: req.body.email,
            name: req.body.name,
            role: req.body.role,
          },
        });

        res.send("User created successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(port, () => {
    console.log("Server started on port " + port);
  });
});
