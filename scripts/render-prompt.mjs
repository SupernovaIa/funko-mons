#!/usr/bin/env node
// Usage: node scripts/render-prompt.mjs <spec.yaml> <front|left|back|right> [base.yaml]
import { readFile } from "node:fs/promises";
import { parse } from "yaml";

const [specPath, view, basePath = "assets/prompt-templates/base.yaml"] = process.argv.slice(2);
if (!specPath || !view) {
  console.error("Usage: render-prompt.mjs <spec.yaml> <front|left|back|right> [base.yaml]");
  process.exit(1);
}

const base = parse(await readFile(basePath, "utf8"));
const spec = parse(await readFile(specPath, "utf8"));
const doc = { ...base, ...spec };

const viewEntry = doc.views[view];
if (!viewEntry) {
  console.error(`Unknown view "${view}". Available: ${Object.keys(doc.views).join(", ")}`);
  process.exit(1);
}

const context = {
  ...doc,
  angle: viewEntry.angle,
  creature: doc.visual_description || doc.subject,
};

function resolve(str) {
  return str.replace(/\{([\w.]+)\}/g, (_, path) => {
    let value = context;
    for (const part of path.split(".")) value = value?.[part];
    if (value === undefined) throw new Error(`Unresolved placeholder: {${path}}`);
    return String(value).trim();
  });
}

console.log(resolve(doc.prompt_template).replace(/\s+/g, " ").trim());
