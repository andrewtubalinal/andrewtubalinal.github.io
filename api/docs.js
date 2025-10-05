import fetch from "node-fetch";
import yaml from "js-yaml";

export default async function handler(req, res) {
  // Handle GET requests - list all docs with content
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

      // Fetch content for each YAML file
      const docs = await Promise.all(
        files
          .filter(file => file.name.endsWith('.yml') || file.name.endsWith('.yaml'))
          .map(async (file) => {
            try {
              // Fetch the actual file content
              const fileResponse = await fetch(file.download_url);
              const fileContent = await fileResponse.text();
              
              // Parse YAML content
              const parsed = yaml.load(fileContent);
              
              return {
                id: file.name,
                filename: file.name,
                title: parsed.title || file.name.replace(/^\d+-/, '').replace(/\.yml$/, '').replace(/_/g, ' '),
                date: parsed.date || file.name.split('-')[0],
                content: parsed.content || parsed.message || Object.values(parsed).slice(2).join('\n') || 'No content',
                rawContent: fileContent
              };
            } catch (error) {
              console.error(`Error parsing file ${file.name}:`, error);
              return {
                id: file.name,
                filename: file.name,
                title: file.name.replace(/^\d+-/, '').replace(/\.yml$/, '').replace(/_/g, ' '),
                date: 'Unknown date',
                content: 'Error loading content',
                rawContent: ''
              };
            }
          })
      );

      // Sort by date (newest first)
      docs.sort((a, b) => new Date(b.date) - new Date(a.date));

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