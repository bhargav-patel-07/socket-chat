import Together from "together-ai";
import { GoogleGenerativeAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Round-robin state for traffic control
let llamaOrGemini = 0;

// TEXT GENERATION: Llama 70B and Gemini 1.5 Flash
export async function generateText(prompt) {
  llamaOrGemini = (llamaOrGemini + 1) % 2;
  try {
    if (llamaOrGemini === 0) {
      // ✅ Pass actual prompt to LLaMA
      const response = await ai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gemini-1.5-flash",
        max_tokens: 2048, // Add this line
        temperature: 0.2, 
      });
      return response.choices?.[0]?.message?.content ?? "";
    } 
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

// IMAGE PROCESSING: Llama Vision Free

export async function generateImageCaption(imageData) {
  llamaOrGemini = (llamaOrGemini + 1) % 2;
  try {
    if (llamaOrGemini === 0) {
      const response = await together.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Describe this image" },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${
                    typeof imageData === "string"
                      ? imageData.split(",")[1] || imageData
                      : imageData.toString("base64")
                  }`,
                },
              },
            ],
          },
        ],
        model: "meta-llama/Llama-Vision-Free",
      });
      return response.choices?.[0]?.message?.content ?? "";
    } else {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: "Describe this image" },
              {
                inlineData: {
                  mimeType: "image/png",
                  data:
                    typeof imageData === "string"
                      ? imageData.split(",")[1]
                      : imageData.toString("base64"),
                },
              },
            ],
          },
        ],
      });
      return response.response.text();
    }
  } catch (err) {
    return `Error: ${err.message}`;
  }
}