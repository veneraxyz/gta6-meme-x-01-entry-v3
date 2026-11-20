// Entry point for the gta6-meme-x-01 meme entry.
//
// The post itself is the entry: the house reads it from X. All this
// program has to do is hand over the post's address, so it copies
// POST.json from the repository root into the output directory.
// Node stdlib only. No network, no other files.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "out");

mkdirSync(outDir, { recursive: true });
copyFileSync(join(repoRoot, "POST.json"), join(outDir, "POST.json"));
console.log(`copied POST.json to ${outDir}`);
