const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not set in Vercel environment variables" });
  }

  try {
    // Vercel auto-parses JSON bodies — but guard against both parsed and raw string
    let body = req.body;
    if (!body) return res.status(400).json({ error: "Empty request body" });
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const { messages, system } = body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: `messages must be an array, got: ${typeof messages}` });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system,
        messages,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
