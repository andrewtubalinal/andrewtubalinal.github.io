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
              
              // Parse YAML content - handle frontmatter format
              let title = file.name.replace(/^\d+-/, '').replace(/\.yml$/, '').replace(/_/g, ' ');
              let date = file.name.split('-')[0];
              let content = '';

              // Try to parse as YAML with frontmatter
              if (fileContent.startsWith('---')) {
                // Split frontmatter and content
                const parts = fileContent.split('---').filter(part => part.trim() !== '');
                
                if (parts.length >= 1) {
                  // Parse frontmatter (first part)
                  const frontmatter = yaml.load(parts[0]);
                  title = frontmatter.title || title;
                  date = frontmatter.date || date;
                  
                  // Get content (second part if exists)
                  if (parts.length >= 2) {
                    content = parts[1].trim();
                  }
                }
              } else {
                // Try direct YAML parsing as fallback
                try {
                  const parsed = yaml.load(fileContent);
                  if (typeof parsed === 'object') {
                    title = parsed.title || title;
                    date = parsed.date || date;
                    // Extract all non-frontmatter fields as content
                    const contentFields = Object.entries(parsed)
                      .filter(([key]) => !['title', 'date'].includes(key))
                      .map(([key, value]) => `${value}`)
                      .join('\n\n');
                    content = contentFields || fileContent;
                  } else {
                    content = fileContent;
                  }
                } catch {
                  content = fileContent;
                }
              }

              // Validate and format date
              let formattedDate;
              try {
                formattedDate = new Date(date).toISOString();
              } catch {
                formattedDate = new Date().toISOString();
              }

              return {
                id: file.name,
                filename: file.name,
                title: title,
                date: formattedDate,
                content: content || 'No content available',
                rawContent: fileContent
              };
            } catch (error) {
              console.error(`Error parsing file ${file.name}:`, error);
              return {
                id: file.name,
                filename: file.name,
                title: file.name.replace(/^\d+-/, '').replace(/\.yml$/, '').replace(/_/g, ' '),
                date: new Date().toISOString(),
                content: 'Error loading content: ' + error.message,
                rawContent: fileContent || ''
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