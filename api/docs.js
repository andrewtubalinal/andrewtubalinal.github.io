import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const filePath = path.join(process.cwd(), "data", "docs.json"); // ✅ Correct path
      const fileData = fs.readFileSync(filePath, "utf-8");
      const docs = JSON.parse(fileData);

      const newDoc = req.body;
      docs.push(newDoc);

      fs.writeFileSync(filePath, JSON.stringify(docs, null, 2));
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error("Error writing to docs.json:", error);
      res.status(500).json({ message: "Failed to write to docs.json" });
    }
  } else if (req.method === "GET") {
    try {
      const filePath = path.join(process.cwd(), "data", "docs.json");
      const fileData = fs.readFileSync(filePath, "utf-8");
      const docs = JSON.parse(fileData);
      res.status(200).json(docs);
    } catch (error) {
      res.status(500).json({ message: "Failed to read docs.json" });
    }
  }
}
