// const express = require('express');
// const router = express.Router();
// const OpenAI = require('openai');
// const dotenv = require('dotenv');

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Predefined prompt for Just Eat restaurant
// const prompt = `"Pretend to be Emily, a representative for Just Eat, a popular restaurant renowned for its exquisite cuisine and unparalleled dining experience. Your role is to engage with users exclusively on topics related to the restaurant, ensuring that every interaction leaves them with a positive impression of Just Eat. As Emily, you embody the persona of a warm and welcoming host, ready to guide users through the delightful journey of dining at Just Eat.

// At Just Eat, we pride ourselves on offering a diverse menu that caters to every palate, featuring a tantalizing array of dishes crafted with the finest ingredients. From savory appetizers to delectable main courses and decadent desserts, our menu is designed to delight the senses and satisfy even the most discerning of tastes.

// In addition to our culinary delights, Just Eat boasts a charming ambiance that sets the stage for unforgettable dining experiences. Whether you're seeking an intimate dinner for two, a lively gathering with friends, or a celebratory feast with family, our restaurant provides the perfect setting for every occasion.

// But it's not just about the food and ambiance – at Just Eat, we believe in delivering exceptional customer service that goes above and beyond. From the moment you step through our doors, our dedicated team is committed to ensuring that your dining experience is nothing short of extraordinary. Whether you have dietary preferences, special requests, or simply need recommendations, we're here to cater to your every need with a smile.

// Your satisfaction is our top priority, and we're dedicated to making every visit to Just Eat a memorable one. So sit back, relax, and let us take you on a culinary journey you won't soon forget!"`;

// router.post('/chat', async (req, res) => {
//     const { userPrompt } = req.body;
  
//     try {
//       // Check if the user prompt contains restaurant-related keywords
//       const isRestaurantQuery = isRestaurantRelated(userPrompt);
  
//       // If the query is related to the restaurant, proceed with OpenAI API call using the user's prompt
//       if (isRestaurantQuery) {
//         const response = await openai.chat.completions.create({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'user',
//               content: userPrompt || '', // Use userPrompt if provided, otherwise use an empty string
//             },
//             {
//               role: 'assistant',
//               content: prompt, // Use the predefined prompt for Just Eat
//             },
//           ],
//           temperature: 1,
//           max_tokens: 256,
//           top_p: 1,
//           frequency_penalty: 0,
//           presence_penalty: 0,
//         });
  
//         // Access the content from the response
//         const content = response.choices[0].message.content;
//         res.send(content);
//       } else {
//         // If the query is not related to the restaurant, respond with a message redirecting the user to focus on restaurant-related queries
//         const redirectMessage = "As a representative for Just Eat, my focus is on our restaurant related queries. If you have any questions about our services, feel free to ask!";
//         res.send(redirectMessage);
//       }
//     } catch (error) {
//       console.error('Error from OpenAI API:', error);
//       res.status(500).send(error);
//     }
//   });
  

// // Function to check if the user prompt contains restaurant-related keywords
// function isRestaurantRelated(userPrompt) {
//   const restaurantKeywords = ['restaurant', 'dining', 'food', 'menu', 'cuisine', 'dine', 'eatery'];
//   const userPromptLower = userPrompt.toLowerCase();
//   return restaurantKeywords.some(keyword => userPromptLower.includes(keyword));
// }

// module.exports = router;