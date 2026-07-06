/**
 * Git utilities for OpenWiki
 */

import { execSync } from "child_process";
import type { UpdateMetadata } from "./constants.js";

export function isInGitRepo(): boolean {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

export function collectGitContext(metadata?: UpdateMetadata | null) {
  const status = execSync("git status --short", { encoding: "utf-8" });
  const log = execSync("git log --oneline --max-count=20", {
    encoding: "utf-8",
  });
  const diff = execSync("git diff --name-status HEAD", {
    encoding: "utf-8",
  }).trim();

  let changesSinceLastUpdate = "";
  if (metadata?.gitHead) {
    try {
      changesSinceLastUpdate = execSync(
        `git log ${metadata.gitHead}..HEAD --name-status --oneline`,
        { encoding: "utf-8" }
      );
    } catch {
      // If gitHead is invalid, fall back to timestamp-based log
      if (metadata.updatedAt) {
        changesSinceLastUpdate = execSync(
          `git log --since="${metadata.updatedAt}" --name-status --oneline`,
          { encoding: "utf-8" }
        );
      }
    }
  }

  return {
    status,
    log,
    diff,
    changesSinceLastUpdate,
  };
}

export function getRepoStructure(): string {
  try {
    // Get file tree, excluding common directories
    const structure = execSync(
      'find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/build/*" | head -100',
      { encoding: "utf-8" }
    );
    return structure;
  } catch {
    return "Could not read repository structure";
  }
}

export function getGitHead(): string {
  try {
    return execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
  } catch {
    return "";
  }
}

export function computeSnapshotHash(openwikiDir: string): string {
  // Simple hash based on file list in openwiki/ (excluding metadata)
  try {
    const files = execSync(
      `find ${openwikiDir} -type f -not -name '.last-update.json' | sort`,
      { encoding: "utf-8" }
    );
    // Simple hash - in production, use crypto.createHash
    return Buffer.from(files).toString("base64").slice(0, 16);
  } catch {
    return "";
  }
}
