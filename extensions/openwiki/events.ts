/**
 * OpenWiki Event Handlers
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { isInGitRepo } from "./git-utils.js";

export function registerEventHandlers(pi: ExtensionAPI) {
  // Welcome message
  pi.on("session_start", async (_event, ctx) => {
    if (isInGitRepo()) {
      ctx.ui.notify(
        "OpenWiki extension loaded. Use /openwiki:init to generate docs.",
        "info"
      );
    }
  });

  // ============================================
  // EVENT: Intercept file operations in openwiki/
  // ============================================
  pi.on("tool_call", async (event, ctx) => {
    // Add helpful context when working with openwiki files
    if (
      ["write", "edit"].includes(event.toolName) &&
      event.input.path?.includes("openwiki/")
    ) {
      ctx.ui.setStatus(
        "openwiki",
        `📝 Updating documentation: ${event.input.path}`
      );
    }
  });

  pi.on("tool_result", async (event, ctx) => {
    if (
      ["write", "edit"].includes(event.toolName) &&
      event.input.path?.includes("openwiki/")
    ) {
      ctx.ui.setStatus("openwiki", "");
    }
  });
}
