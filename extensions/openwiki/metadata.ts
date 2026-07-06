/**
 * Metadata utilities for OpenWiki
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import type { UpdateMetadata } from "./constants.js";
import { METADATA_FILE, OPENWIKI_DIR } from "./constants.js";
import { getGitHead, computeSnapshotHash } from "./git-utils.js";

export function loadMetadata(): UpdateMetadata | null {
  try {
    if (!existsSync(METADATA_FILE)) {
      return null;
    }
    const content = readFileSync(METADATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function saveMetadata(command: "init" | "update", model: string): UpdateMetadata {
  const metadata: UpdateMetadata = {
    command,
    model,
    updatedAt: new Date().toISOString(),
    gitHead: getGitHead(),
    snapshotHash: computeSnapshotHash(OPENWIKI_DIR),
  };

  writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  return metadata;
}
