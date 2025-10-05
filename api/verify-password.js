// /api/verify-password.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Ensure we parse the request body properly
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    });

    const { password } = body;
    const secret = process.env.APP_PASSWORD;

    if (!secret) {
      console.error("❌ APP_PASSWORD is missing in environment variables");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }

    if (password === secret) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (err) {
    console.error("Error parsing request:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
