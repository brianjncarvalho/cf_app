import { getStore } from "@netlify/blobs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

export default async (req, context) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const store = getStore("crossfit-tracker");
  const url = new URL(req.url);
  const key = url.searchParams.get("key") || "default";

  // GET — load data
  if (req.method === "GET") {
    try {
      const value = await store.get(key, { type: "json" });
      return new Response(JSON.stringify({ data: value || null }), { status: 200, headers: CORS });
    } catch (err) {
      return new Response(JSON.stringify({ data: null, error: err.message }), { status: 200, headers: CORS });
    }
  }

  // POST — save data
  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.setJSON(key, body.data);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: CORS });
    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers: CORS });
    }
  }

  return new Response("Method not allowed", { status: 405, headers: CORS });
};

export const config = { path: "/api/data" };
