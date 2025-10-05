import { Octokit } from "@octokit/rest";
import yaml from "js-yaml";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { title, message } = req.body;
  if (!title || !message)
    return res.status(400).json({ message: "Missing title or message" });

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const repo = process.env.REPO_NAME;
  const [owner, repoName] = repo.split("/");

  const path = "data/docs.yml";

  try {
    // Get the file from GitHub
    const { data } = await octokit.repos.getContent({
      owner,
      repo: repoName,
      path,
    });

    const content = Buffer.from(data.content, "base64").toString("utf8");
    const parsed = yaml.load(content) || { docs: [] };

    // Append new entry
    parsed.docs.push({
      title,
      message,
      timestamp: new Date().toISOString(),
    });

    const updatedYml = yaml.dump(parsed);

    // Commit the updated file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: repoName,
      path,
      message: `📝 Add doc: ${title}`,
      content: Buffer.from(updatedYml, "utf8").toString("base64"),
      sha: data.sha,
    });

    res.status(200).json({ success: true, message: "Document saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
