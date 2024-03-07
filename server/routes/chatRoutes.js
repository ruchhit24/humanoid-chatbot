const express = require('express');
const router = express.Router();
const OpenAI = require("openai");
const dotenv = require("dotenv");

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
 
    const combinedPrompt = userPrompt ? `${process.env.JUST_EAT_PROMPT} ${userPrompt}` : process.env.JUST_EAT_PROMPT;

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

    // Call OpenAI API with combined messages
    const response = await openai.chat.completions.create({
      ...openaiParams,
      messages,
    });

    const content = response.choices[0].message.content;
    console.log("Content from OpenAI API:", content);

    // Remove the oldest conversation if the cache exceeds 5 conversations
    if (recentConversations.length >= 5) {
      recentConversations.shift();
    }

    // Add the current conversation to the cache
    recentConversations.push({ userInput: combinedPrompt, chatbotResponse: content });

    res.send(content);
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    res.status(500).send("Error from OpenAI API");
  }
});

module.exports = router;
