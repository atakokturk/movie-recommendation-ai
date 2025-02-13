const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const OpenAI = require("openai");
const path = require("path");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/recommend", async (req, res) => {
  try {
    const userInput = req.query.input;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are helpful recommending movies." },
        { role: "user", content: userInput + "\n List out all movies" },
      ],
      max_tokens:50,
    });
    console.log("yanıt:", completion)
    res.json({recommendation: completion.choices[0].message.content});

  
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in process in your request");
  }
});

app.post("/recommend", (req, res) => {
  console.log("Received request:", req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
