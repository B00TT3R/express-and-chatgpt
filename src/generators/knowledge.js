import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
async function knowledge() {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 1.5,
        max_tokens:45,
        messages: [
            { role: "user", content: "Create a quote about knowledge" },            
        ],
    });
    return res;
}

export default knowledge