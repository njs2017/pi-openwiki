/**
 * OpenWiki Commands
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { existsSync } from "fs";
import { OPENWIKI_DIR, METADATA_FILE } from "./constants.js";
import { isInGitRepo, collectGitContext, getRepoStructure } from "./git-utils.js";
import { loadMetadata } from "./metadata.js";
import { SYSTEM_PROMPT_INIT, SYSTEM_PROMPT_UPDATE, SYSTEM_PROMPT_CHAT } from "./prompts.js";

export function registerCommands(pi: ExtensionAPI) {
  // ============================================
  // COMMAND: /openwiki:init
  // ============================================
  pi.registerCommand("openwiki:init", {
    description: "Initialize OpenWiki documentation for this repository",
    handler: async (args, ctx) => {
      if (!isInGitRepo()) {
        ctx.ui.notify("Not in a git repository!", "error");
        return;
      }

      ctx.ui.notify("Initializing OpenWiki documentation...", "info");

      // Trigger the LLM with OpenWiki system prompt
      const gitContext = collectGitContext();
      const repoStructure = getRepoStructure();

      const prompt = `${SYSTEM_PROMPT_INIT}

# Repository Context

## Git History
${gitContext.log}

## Repository Structure
${repoStructure}

## Current Status
${gitContext.status}

## Recent Changes
${gitContext.diff}

---

Please analyze this repository and create comprehensive documentation in the ${OPENWIKI_DIR}/ directory. Start with ${OPENWIKI_DIR}/quickstart.md as the entry point.`;

      // Insert message into session for LLM to process
      pi.sendUserMessage(prompt);

      ctx.ui.notify(
        "Documentation generation started. The AI will now analyze the repository...",
        "success"
      );
    },
  });

  // ============================================
  // COMMAND: /openwiki:update
  // ============================================
  pi.registerCommand("openwiki:update", {
    description: "Update existing OpenWiki documentation with recent changes",
    handler: async (args, ctx) => {
      if (!isInGitRepo()) {
        ctx.ui.notify("Not in a git repository!", "error");
        return;
      }

      if (!existsSync(METADATA_FILE)) {
        ctx.ui.notify(
          "No existing OpenWiki found. Use /openwiki:init first.",
          "error"
        );
        return;
      }

      const metadata = loadMetadata();

      if (!metadata) {
        ctx.ui.notify("Failed to load metadata. Use /openwiki:init first.", "error");
        return;
      }

      const gitContext = collectGitContext(metadata);

      // Debug: show what changes were detected
      ctx.ui.notify(`Checking for changes since last update...`, "info");

      // Check if update is needed
      if (!gitContext.changesSinceLastUpdate || gitContext.changesSinceLastUpdate.trim() === "") {
        ctx.ui.notify("No changes detected since last update. Skipping.", "warning");
        return;
      }

      ctx.ui.notify("Updating OpenWiki documentation...", "info");

      const prompt = `${SYSTEM_PROMPT_UPDATE}

# Update Context

## Last Update
${JSON.stringify(metadata, null, 2)}

## Changes Since Last Update
${gitContext.changesSinceLastUpdate}

## Current Status
${gitContext.status}

## Uncommitted Changes
${gitContext.diff}

---

Please update the documentation in ${OPENWIKI_DIR}/ to reflect these changes. Focus only on areas affected by the changes.`;

      pi.sendUserMessage(prompt);

      ctx.ui.notify(
        "Documentation update started. The AI will analyze changes...",
        "success"
      );
    },
  });

  // ============================================
  // COMMAND: /openwiki:chat
  // ============================================
  pi.registerCommand("openwiki:chat", {
    description: "Ask questions about OpenWiki documentation",
    handler: async (args, ctx) => {
      const question = args || "";

      if (!question.trim()) {
        ctx.ui.notify("Usage: /openwiki:chat <question>", "error");
        return;
      }

      const prompt = `${SYSTEM_PROMPT_CHAT}

User Question: ${question}

Please answer based on the current repository and existing OpenWiki documentation (if it exists).`;

      pi.sendUserMessage(prompt);
    },
  });
}
