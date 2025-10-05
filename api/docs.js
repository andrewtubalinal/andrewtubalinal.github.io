import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "docs.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, "utf8"))
        : [];
      return res.status(200).json({ success: true, docs: data });
    } catch (e) {
      return res.status(500).json({ success: false, error: "Failed to read docs." });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, message } = req.body;
      if (!title || !message)
        return res.status(400).json({ success: false, error: "Missing fields." });

      const newDoc = { id: Date.now(), title, message };
      const existing = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, "utf8"))
        : [];
      existing.unshift(newDoc);

      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: "Failed to save doc." });
    }
  }

  return res.status(405).json({ success: false });
}
