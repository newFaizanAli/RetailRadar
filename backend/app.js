const express = require("express");
const server = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require("cors");

const { fetchProductData } = require("./handlers/define");
const PORT = process.env.PORT || 8000;

server.use(express.static("public"));

server.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

// transflow

const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");
const { createCanvas, loadImage } = require("canvas");
const { analysisProductPrompt, generateAnalyse } = require("./lib/functions");

server.post("/product-hunting/:productName?/:platformName?", fetchProductData);

server.post("/analyze-products", async (req, res) => {
  try {
    const { products, huggingfaceKey, analyseWay } = req.body;

    if (analyseWay === "huggingface") {
      const result = await generateAnalyse(products, huggingfaceKey);

      return res.json({ ...result });
    } else {
      const prompt = analysisProductPrompt(products);

      const scriptPath = path.join(__dirname, "generate_text.py");
      const pythonProcess = spawn("python", [scriptPath, prompt]);

      let result = "";
      let errorOutput = "";

      pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          return res.json({
            error: `Script execution failed, ${errorOutput} | Consider using a HuggingFace API key for better reliability.`,
          });
        }

        console.log("Generated Result:", result.trim());
        return res.json({ success: true, result: result.trim() });
      });
    }
  } catch (e) {
    res.json({ error: err.message });
  }
});

server.post("/predict", upload.single("image"), async (req, res) => {
  const imagePath = path.join(__dirname, req.file.path);

  const image = await loadImage(imagePath);

  // Create canvas to convert image for tfjs
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  // Load the MobileNet model
  const model = await mobilenet.load();

  // Get predictions
  const predictions = await model.classify(canvas);

  // Delete uploaded file after prediction
  fs.unlinkSync(imagePath);

  res.json({
    success: true,
    predictions, // will return label + probability
  });
});

server.listen(PORT, () => {
  try {
    console.log(`Backend server running on port ${PORT}`);
  } catch (e) {
    console.log(e.message);
  }
});
