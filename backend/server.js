import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("Please set OPENAI_API_KEY in .env");
  process.exit(1);
}

app.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const systemPrompt = `You are a helpful job market assistant. When given a user query about "companies hiring", return a JSON array of companies with fields: name, roles (short string), location (city/country or 'Remote'), and url (link to job listing or careers page if available). Return only valid JSON, example:
[
  {"name":"ExampleCorp","roles":"ML Engineer, Data Scientist","location":"Toronto, Canada","url":"https://example.com/careers"},
  ...
]`;

    const userPrompt = `User query: ${query}
Please return up to 8 relevant companies currently hiring based on this query. If unknown, use best effort. Provide real companies where possible.`;

    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 600,
      temperature: 0.2
    };

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await resp.json();

    const text = data?.choices?.[0]?.message?.content ?? "";

    const cleaned = text.replace(/^```json/, "").replace(/```$/, "").trim();

    try {
      const parsed = JSON.parse(cleaned);
      return res.json({ ok: true, source: "openai", companies: parsed });
    } catch (err) {
      return res.json({ ok: false, error: "Failed to parse JSON from model", raw: text });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
