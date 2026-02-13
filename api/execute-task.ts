import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { task, device_id } = req.body;

  // Use Gemini to generate action plan
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = `
Task: "${task}"

Generate a detailed action plan for an Android phone.
Return as JSON array of actions.
`;

  const result = await model.generateContent(prompt);
  const actionPlan = result.response.text();

  res.status(200).json({ action_plan: actionPlan });
}
