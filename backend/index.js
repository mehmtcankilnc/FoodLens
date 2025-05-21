require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;

const {
  TranslateClient,
  TranslateTextCommand,
} = require("@aws-sdk/client-translate");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { searchFoods } = require("../src/services/fatsecretService");

const client = new TranslateClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

app.post("/translate", async (req, res) => {
  const { text, fromLang, toLang } = req.body;

  const command = new TranslateTextCommand({
    Text: text,
    SourceLanguageCode: fromLang,
    TargetLanguageCode: toLang,
  });

  try {
    const response = await client.send(command);
    res.json({ translatedText: response.TranslatedText });
  } catch (error) {
    console.error("Translate error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.post("/fatsecret/search", async (req, res) => {
  const { query } = req.body;
  try {
    const data = await searchFoods(query);
    res.json(data);
  } catch (error) {
    console.error("FatSecret API error:", error.message);
    res.status(500).json({ error: "FatSecret search failed" });
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
