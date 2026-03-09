const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const redis = {
  get: async (key) => {
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
    });
    const json = await res.json();
    if (json.result === null || json.result === undefined) return null;
    try { return JSON.parse(json.result); } catch { return json.result; }
  },
  set: async (key, value) => {
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/${encodeURIComponent(key)}`;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify(value)),
    });
  },
};

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(204).end();

  const key = req.query.key || "default";

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    if (req.method === "GET") return res.status(200).json({ data: null });
    if (req.method === "POST") return res.status(200).json({ ok: true });
  }

  if (req.method === "GET") {
    try {
      const value = await redis.get(`cf:${key}`);
      return res.status(200).json({ data: value });
    } catch (err) {
      return res.status(200).json({ data: null, error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      // Parse body if needed
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body);
      await redis.set(`cf:${key}`, body.data);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
