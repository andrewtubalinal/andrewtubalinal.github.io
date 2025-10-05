import fetch from "node-fetch";

export default async function handler(req, res) {
  // Handle GET requests - list all docs
  if (req.method === "GET") {
    try {
      const token = process.env.ANDREW_TOKEN;
      const repoOwner = "andrewtubalinal";
      const repoName = "andrewtubalinal.github.io";
      const targetBranch = "serve";

      if (!token) {
        return res.status(500).json({ message: "Missing GitHub token on server" });
      }

      // GitHub API to get contents of _docs directory
      const githubUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/_docs?ref=${targetBranch}`;

      const response = await fetch(githubUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        console.error("GitHub API Error:", await response.json());
        return res.status(500).json({
          success: false,
          message: "Failed to fetch documents",
        });
      }

      const files = await response.json();

      // Filter for YAML files and extract basic info
      const docs = files
        .filter(file => file.name.endsWith('.yml') || file.name.endsWith('.yaml'))
        .map(file => ({
          id: file.name,
          title: file.name.replace(/^\d+-/, '').replace(/\.yml$/, '').replace(/_/g, ' '),
          filename: file.name,
          url: file.download_url,
        }));

      return res.status(200).json({ success: true, docs });
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Handle POST requests - create new doc (your existing code)
  if (req.method === "POST") {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing title or content" });
    }

    const token = process.env.ANDREW_TOKEN;
    const repoOwner = "andrewtubalinal";
    const repoName = "andrewtubalinal.github.io";
    const targetBranch = "serve";

    if (!token) {
      return res.status(500).json({ message: "Missing GitHub token on server" });
    }

    try {
      const fileName = `${Date.now()}-${title.replace(/\s+/g, "_")}.yml`;
      const filePath = `_docs/${fileName}`;

      const newFileContent = `---
title: "${title}"
date: "${new Date().toISOString()}"
---

${content}
`;

      const githubUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

      const response = await fetch(githubUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: `📜 Added doc: ${title}`,
          content: Buffer.from(newFileContent).toString("base64"),
          branch: targetBranch,
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

  // Method not allowed
  return res.status(405).json({ message: "Method Not Allowed" });
}