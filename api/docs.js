import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import yaml from "js-yaml";

export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // e.g. "andrewtubalinal/andrewtubalinal.github.io"

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return res.status(500).json({ message: "Missing GitHub environment variables" });
  }

  // Handle POST → create a new YAML file and push to GitHub
  if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }

      // Convert content to YAML
      const yamlContent = yaml.dump({
        title,
        content,
        timestamp: new Date().toISOString(),
      });

      // Unique filename based on timestamp
      const fileName = `${title.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}.yml`;
      const filePath = `docs/${fileName}`;

      // Get current file (to check if folder exists)
      const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

      // Encode YAML to base64 for GitHub API
      const base64Content = Buffer.from(yamlContent).toString("base64");

      // Create the commit via GitHub API
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Added documentation: ${title}`,
          content: base64Content,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub API error: ${response.status} ${text}`);
      }

      return res.status(200).json({ message: "Documentation saved to GitHub successfully!" });
    } catch (error) {
      console.error("Error writing YAML to GitHub:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Handle GET → list all documentation files (from local fallback)
  else if (req.method === "GET") {
    try {
      const filePath = path.join(process.cwd(), "data", "docs.json");
      if (!fs.existsSync(filePath)) {
        return res.status(200).json([]);
      }
      const fileData = fs.readFileSync(filePath, "utf-8");
      const docs = JSON.parse(fileData);
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(500).json({ message: "Failed to read docs.json" });
    }
  }

  // Unsupported method
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
