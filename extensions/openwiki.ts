/**
 * OpenWiki Extension for Pi - Main Entry Point
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerCommands } from "./openwiki/commands.js";
import { registerTools } from "./openwiki/tools.js";
import { registerEventHandlers } from "./openwiki/events.js";

export default function (pi: ExtensionAPI) {
  // Register all commands
  registerCommands(pi);

  // Register all tools
  registerTools(pi);

  // Register event handlers
  registerEventHandlers(pi);
}
