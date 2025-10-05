export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const PASSWORD = process.env.APP_PASSWORD; // Secret stored in Vercel
  const { input } = await req.json();

  if (!PASSWORD) {
    return res.status(500).json({ message: "Server not configured" });
  }

  if (input === PASSWORD) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
}
