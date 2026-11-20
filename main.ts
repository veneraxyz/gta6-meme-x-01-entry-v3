// Entry point for the gta6-meme-x-01 meme entry.
//
// The post itself is the entry: the house reads it from X. All this
// program has to do is hand over the post's address, so it copies
// POST.json from the repository root into the output directory.
// Node stdlib only. No network, no other files.
// POST.json must be valid JSON with a non-empty url string before it
// is copied: a broken or empty post address would fail the play-link
// check at submission, so fail loudly here instead of shipping it.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "out");
const postPath = join(repoRoot, "POST.json");

let post;
try {
  post = JSON.parse(readFileSync(postPath, "utf8"));
} catch (error) {
  console.error(`error: POST.json is not valid JSON: ${(error as Error).message}`);
  process.exit(1);
}
if (typeof post?.url !== "string" || post.url.trim() === "") {
  console.error("error: POST.json has no non-empty url string");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postPath, join(outDir, "POST.json"));
console.log(`copied POST.json to ${outDir}`);
