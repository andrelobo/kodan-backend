import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

async function main() {
  try {
    const response = await client.chat.completions.create({
      model: "qwen/qwen3-coder-480b-a35b-instruct",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista fiscal brasileiro para MEIs.",
        },
        {
          role: "user",
          content:
            "MEI precisa emitir nota fiscal para pessoa física?",
        },
      ],
      temperature: 0.2,
      max_tokens: 500,
    });

    console.log("\n=== RESPOSTA ===\n");

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
  }
}

main();