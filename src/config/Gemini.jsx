import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Load API key from environment variable for better security
const apiKey = "AIzaSyD5tmjEJ2qIi41xRGA72SbYLPK8GyCk01s";

if (!apiKey) {
  throw new Error("API key is missing. Please set it in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],  // Initialize history if needed
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();  // Return the result if needed
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;  // Rethrow to handle it further up the call chain if needed
  }
}
