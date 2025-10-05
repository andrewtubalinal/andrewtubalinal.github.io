import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing title or content" });
  }

  const token = process.env.ANDREW_TOKEN;
  const repoOwner = "andrewtubalinal";
  const repoName = "andrewtubalinal.github.io";

  if (!token) {
    return res.status(500).json({ message: "Missing GitHub token on server" });
  }

  try {
    // Create YAML-like file name (timestamped)
    const fileName = `${Date.now()}-${title.replace(/\s+/g, "_")}.yml`;
    const filePath = `_docs/${fileName}`; // optional: keep docs organized in folder

    const newFileContent = `---
title: "${title}"
date: "${new Date().toISOString()}"
---

${content}
`;

    // GitHub API endpoint for file creation
    const githubUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    const response = await fetch(githubUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: `📜 Added doc: ${title}`,
        content: Buffer.from(newFileContent).toString("base64"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("GitHub API Error:", data);
      return res.status(500).json({
        success: false,
        message: data.message || "GitHub API error",
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
