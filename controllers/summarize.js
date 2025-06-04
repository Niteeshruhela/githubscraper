import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY});

export async function summarizeUser(userData) {
  const prompt = `Summarize this GitHub user's profile and infer skills, tech stack, and notable contributions:\n\n${JSON.stringify(userData, null, 2)}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You summarize GitHub developer profiles.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;

    return {
      summary: content,
      skills: extractList(content, /Skills: (.*)/),
      techStack: extractList(content, /Tech Stack: (.*)/),
      notableContributions: extractList(content, /Notable Contributions: (.*)/)
    };

  } catch (err) {
    console.error('OpenAI Error:', err.message);
    return {
      summary: 'Error generating summary',
      skills: [],
      techStack: [],
      notableContributions: []
    };
  }
}

function extractList(text, regex) {
  const match = text.match(regex);
  return match ? match[1].split(',').map(s => s.trim()) : [];
}
