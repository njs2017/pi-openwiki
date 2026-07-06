/**
 * Constants for OpenWiki Extension
 */

export const OPENWIKI_DIR = "openwiki";
export const METADATA_FILE = `${OPENWIKI_DIR}/.last-update.json`;

export interface UpdateMetadata {
  command: "init" | "update";
  model: string;
  updatedAt: string;
  gitHead?: string;
  snapshotHash?: string;
}
