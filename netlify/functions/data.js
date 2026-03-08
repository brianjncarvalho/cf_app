const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }

  const store = getStore("crossfit-tracker");
  const key = event.queryStringParameters?.key || "default";

  if (event.httpMethod === "GET") {
    try {
      const value = await store.get(key, { type: "json" });
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ data: value || null }) };
    } catch (err) {
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ data: null, error: err.message }) };
    }
  }

  if (event.httpMethod === "POST") {
    try {
      const { data } = JSON.parse(event.body);
      await store.setJSON(key, data);
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
    } catch (err) {
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ ok: false, error: err.message }) };
    }
  }

  return { statusCode: 405, headers: CORS, body: "Method not allowed" };
};
