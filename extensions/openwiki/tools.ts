/**
 * OpenWiki Tools
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { METADATA_FILE, OPENWIKI_DIR } from "./constants.js";
import { saveMetadata } from "./metadata.js";

export function registerTools(pi: ExtensionAPI) {
  // ============================================
  // TOOL: openwiki_save_metadata
  // ============================================
  pi.registerTool({
    name: "openwiki_save_metadata",
    label: "Save OpenWiki Metadata",
    description: "Save metadata after documentation generation/update",
    promptSnippet: "After generating/updating docs, save metadata to track changes",
    parameters: Type.Object({
      command: Type.Union([Type.Literal("init"), Type.Literal("update")], {
        description: "Type of operation performed",
      }),
      model: Type.String({
        description: "Model used for generation",
      }),
    }),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      try {
        const metadata = saveMetadata(params.command, params.model);

        return {
          content: [
            {
              type: "text",
              text: `✅ Metadata saved to ${METADATA_FILE}\n${JSON.stringify(metadata, null, 2)}`,
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Failed to save metadata: ${error.message}`,
            },
          ],
        };
      }
    },
  });

  // ============================================
  // TOOL: openwiki_ensure_agents_md
  // ============================================
  pi.registerTool({
    name: "openwiki_ensure_agents_md",
    label: "Ensure AGENTS.md Reference",
    description: "Add OpenWiki reference to AGENTS.md or CLAUDE.md files",
    promptSnippet: "Update root agent instruction files to reference OpenWiki",
    parameters: Type.Object({}),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      const openwikiSection = `## OpenWiki

This repository has documentation located in the /${OPENWIKI_DIR} directory.

Start here:
- [OpenWiki quickstart](${OPENWIKI_DIR}/quickstart.md)

OpenWiki includes repository overview, architecture notes, workflows, domain concepts, operations, integrations, testing guidance, and source maps.

When working in this repository, read the OpenWiki quickstart first, then follow its links to the relevant architecture, workflow, domain, operation, and testing notes.`;

      const results: string[] = [];

      // Check and update AGENTS.md
      const agentsFile = "AGENTS.md";
      if (existsSync(agentsFile)) {
        const content = readFileSync(agentsFile, "utf-8");
        if (!content.includes("## OpenWiki")) {
          writeFileSync(agentsFile, `${content}\n\n${openwikiSection}\n`);
          results.push(`✅ Added OpenWiki section to ${agentsFile}`);
        } else {
          results.push(`ℹ️  ${agentsFile} already has OpenWiki section`);
        }
      } else {
        writeFileSync(agentsFile, `${openwikiSection}\n`);
        results.push(`✅ Created ${agentsFile} with OpenWiki section`);
      }

      // Check and update CLAUDE.md
      const claudeFile = "CLAUDE.md";
      if (existsSync(claudeFile)) {
        const content = readFileSync(claudeFile, "utf-8");
        if (!content.includes("## OpenWiki")) {
          writeFileSync(claudeFile, `${content}\n\n${openwikiSection}\n`);
          results.push(`✅ Added OpenWiki section to ${claudeFile}`);
        } else {
          results.push(`ℹ️  ${claudeFile} already has OpenWiki section`);
        }
      }

      return {
        content: [
          {
            type: "text",
            text: results.join("\n"),
          },
        ],
      };
    },
  });
}
