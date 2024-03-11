const express = require('express');
const router = express.Router();
const OpenAI = require("openai");
const dotenv = require("dotenv");
const { translate } = require('google-translate-api-x');
const langdetect = require('langdetect');
const HttpsProxyAgent = require('https-proxy-agent');


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Array to store recent conversations (in-memory cache)
const recentConversations = [];

const openaiParams = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
}; 

router.post("/chat", async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // Detect User Language
    const detectedLanguage = langdetect.detect(userPrompt);
    console.log("Detected User Language:", detectedLanguage);

    // Translate the prompt to English (if it's not already)
    let englishPrompt = userPrompt;
    if (detectedLanguage[0].lang !== 'en') {
      const translation = await translate(userPrompt, { to: 'en' });
      englishPrompt = translation.text;
    }

    const combinedPrompt = `${process.env.JUST_EAT_PROMPT} ${englishPrompt}`;

    // Include recent conversations in the messages array
    const messages = recentConversations.map(conversation => ({
      role: "user",
      content: conversation.userInput
    }));

    // Add the current user prompt to messages array
    messages.push({
      role: "user",
      content: combinedPrompt
    });

    // Call OpenAI API with messages (in English)
    const response = await openai.chat.completions.create({
      ...openaiParams,
      messages,
    });

    let content = response.choices[0].message.content;

    // Translate the response back to the detected language (if it's not English)
    if (detectedLanguage[0].lang !== 'en') {
      const translation = await translate(content, { to: detectedLanguage[0].lang });
      content = translation.text;
    }

    console.log("Translated Content:", content);

    // Remove the oldest conversation if the cache exceeds 5 conversations
    if (recentConversations.length >= 5) {
      recentConversations.shift();
    }

    // Add the current conversation to the cache
    recentConversations.push({ userInput: combinedPrompt, chatbotResponse: content });

    res.send(content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
