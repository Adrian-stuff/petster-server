"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const clarifai_1 = __importDefault(require("clarifai"));
const cors_1 = __importDefault(require("cors"));
console.log(process.env.CLARIFAI_KEY);
// Initialize the Clarifai API client
const clarifai = new clarifai_1.default.App({
    apiKey: process.env.CLARIFAI_KEY,
});
// Set up the multer middleware for handling file uploads
const upload = (0, multer_1.default)();
// Create an Express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
function predictObjects(imageBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield clarifai.models.predict(clarifai_1.default.GENERAL_MODEL, {
            base64: imageBuffer.toString("base64"),
        });
        return response.outputs[0].data.concepts.map((concept) => concept.name);
    });
}
// Define a route for handling image uploads
app.post("/check-animal", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Use the Clarifai API to analyze the uploaded image
    if (req.file) {
        console.log(req.file);
        console.log(req.files);
        try {
            // Analyze the uploaded image with Clarifai
            const objects = yield predictObjects(req.file.buffer);
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
            }
            else {
                // If there are no animals, respond with an error message
                res.json({ hasAnimals });
            }
        }
        catch (error) {
            console.error("Error analyzing image:", error);
            res.status(500).send("Error analyzing image");
        }
    }
}));
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
