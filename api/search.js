export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // CORS preflight (obligatoire)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing search query" });
    }

    const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}`;
    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Deezer search error" });
  }
}
