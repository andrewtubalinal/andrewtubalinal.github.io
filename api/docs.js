import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, message: "Method not allowed" });

  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ success: false, message: "Missing title or content" });

  try {
    const token = process.env.ANDREW_TOKEN;
    const repo = "andrewtubalinal/andrewtubalinal.github.io";
    const filePath = `_docs/${Date.now()}-${title.replace(/\s+/g, "-").toLowerCase()}.yml`;

    const yamlContent = `---
title: "${title}"
date: "${new Date().toISOString()}"
---

${content}
`;

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add documentation: ${title}`,
        content: Buffer.from(yamlContent).toString("base64"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("GitHub API Error:", data);
      return res
        .status(500)
        .json({ success: false, message: data.message || "GitHub API failed" });
    }

    return res.status(200).json({ success: true, message: "Documentation created", data });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
