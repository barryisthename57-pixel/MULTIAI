import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { device_id } = req.query;

  // Get user's behavior patterns from database
  // const patterns = await getPatterns(device_id);

  // Use Gemini to generate predictions
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = `
Based on this user's behavior patterns, predict what they will do next:
- Time: ${new Date().getHours()}:00
- Day: ${new Date().getDay()}

Return top 3 predictions as JSON array.
`;

  const result = await model.generateContent(prompt);
  const predictions = JSON.parse(result.response.text());

  res.status(200).json({ predictions });
}
