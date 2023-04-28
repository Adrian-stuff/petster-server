require("dotenv").config();

import express, { Request, Response } from "express";
import multer from "multer";
import Clarifai from "clarifai";
import cors from "cors";
import { firebaseApp } from "./config";
console.log(process.env.CLARIFAI_KEY);
// Initialize the Clarifai API client
const clarifai = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY,
});

// Set up the multer middleware for handling file uploads
const upload = multer();

// Create an Express app
const app = express();
app.use(cors());

async function predictObjects(imageBuffer: Buffer): Promise<string[]> {
  const response = await clarifai.models.predict(Clarifai.GENERAL_MODEL, {
    base64: imageBuffer.toString("base64"),
  });
  return response.outputs[0].data.concepts.map(
    (concept: { name: any }) => concept.name
  );
}
// Define a route for handling image uploads
app.post(
  "/check-animal",
  upload.single("image"),
  async (req: Request, res: Response) => {
    // Use the Clarifai API to analyze the uploaded image
    if (req.file) {
      console.log(req.file);
      console.log(req.files);

      try {
        // Analyze the uploaded image with Clarifai
        const objects = await predictObjects(req.file.buffer);

        // Check if any of the detected objects are animals
        const animals = [
          "animal",
          "mammal",
          "bird",
          "reptile",
          "fish",
          "insect",
        ];
        const hasAnimals = objects.some((object) => animals.includes(object));

        if (hasAnimals) {
          // If there are animals, respond with 'OK'
          res.json({ hasAnimals });
        } else {
          // If there are no animals, respond with an error message
          res.json({ hasAnimals });
        }
      } catch (error) {
        console.error("Error analyzing image:", error);
        res.status(500).send("Error analyzing image");
      }
    }
  }
);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
