#!/usr/bin/env node
// Usage: node --env-file=.env.local scripts/generate-3d-model.mjs <image-path> <output-slug>
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const BASE_URL = "https://openapi.tripo3d.ai/v3";
const API_KEY = process.env.TRIPO_API_KEY;

if (!API_KEY) {
  console.error("Missing TRIPO_API_KEY. Run with: node --env-file=.env.local scripts/generate-3d-model.mjs <image> <slug>");
  process.exit(1);
}

const [imagePath, slug] = process.argv.slice(2);
if (!imagePath || !slug) {
  console.error("Usage: generate-3d-model.mjs <image-path> <output-slug>");
  process.exit(1);
}

function authHeaders(extra = {}) {
  return { Authorization: `Bearer ${API_KEY}`, ...extra };
}

async function uploadImage(path) {
  const fileBuffer = await readFile(path);
  const form = new FormData();
  form.append("file", new Blob([fileBuffer]), basename(path));

  const res = await fetch(`${BASE_URL}/files`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  const json = await res.json();
  if (!res.ok || json.code !== 0) throw new Error(`Upload failed: ${JSON.stringify(json)}`);
  return json.data.file_token;
}

async function createTask(fileToken) {
  const res = await fetch(`${BASE_URL}/generation/image-to-model`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      type: "image_to_model",
      file: { type: "png", file_token: fileToken },
      model: "v3.1-20260211",
      texture: true,
      pbr: true,
      texture_quality: "detailed",
      face_limit: 20000,
      smart_low_poly: true,
    }),
  });
  const json = await res.json();
  if (!res.ok || json.code !== 0) throw new Error(`Task creation failed: ${JSON.stringify(json)}`);
  return json.data.task_id;
}

async function getTask(taskId) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    headers: authHeaders(),
  });
  const json = await res.json();
  if (!res.ok || json.code !== 0) throw new Error(`Task query failed: ${JSON.stringify(json)}`);
  return json.data;
}

async function waitForTask(taskId) {
  while (true) {
    const task = await getTask(taskId);
    console.log(`[${task.status}] progress=${task.progress}`);
    if (task.status === "success") return task;
    if (["failed", "cancelled", "banned", "expired"].includes(task.status)) {
      throw new Error(`Task ended with status ${task.status}: ${JSON.stringify(task)}`);
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
}

async function downloadModel(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(outPath, buffer);
}

const fileToken = await uploadImage(imagePath);
console.log("Uploaded, file_token:", fileToken);

const taskId = await createTask(fileToken);
console.log("Task created:", taskId);

const task = await waitForTask(taskId);
const modelUrl = task.output?.model_url || task.output?.pbr_model || task.output?.model;
if (!modelUrl) throw new Error("No model URL in task output: " + JSON.stringify(task.output));

const outPath = `public/models/${slug}.glb`;
await downloadModel(modelUrl, outPath);
console.log("Saved model to", outPath);
