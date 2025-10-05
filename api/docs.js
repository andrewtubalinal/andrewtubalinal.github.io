// /api/docs.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing title or content" });
  }

  const GITHUB_TOKEN = process.env.ANDREW_TOKEN;
  const REPO = "andrewtubalinal/andrewtubalinal.github.io";
  const FOLDER = "_docs";
  const FILE_NAME = `${new Date().toISOString().split("T")[0]}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}.yml`;

  const filePath = `${FOLDER}/${FILE_NAME}`;
  const fileContent = `title: "${title}"\ncontent: "${content.replace(/\n/g, "\\n")}"`;

  try {
    // Encode content to base64 for GitHub API
    const base64Content = Buffer.from(fileContent).toString("base64");

    const githubRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: `Add documentation: ${title}`,
          content: base64Content,
        }),
      }
    );

    const result = await githubRes.json();

    if (githubRes.ok) {
      return res.status(200).json({ success: true, result });
    } else {
      console.error("GitHub API error:", result);
      return res.status(500).json({ success: false, message: result.message });
    }
  } catch (err) {
    console.error("Error pushing to GitHub:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
