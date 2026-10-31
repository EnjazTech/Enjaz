/**
 * Static server for local preview and the acceptance suite.
 *
 * Headers come from vercel.json, so the Content-Security-Policy under test can
 * never drift from the one production sends.
 *
 *   node tests/server.mjs [--port=8000] [--root=DIR] [--experience-dir=DIR]
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(fileURLToPath(new URL("../../..", import.meta.url)));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

export async function serve({ root = REPO, port = 0, experienceDir = null } = {}) {
  const config = JSON.parse(await readFile(join(REPO, "vercel.json"), "utf8"));
  const globalHeaders =
    config.headers.find((rule) => rule.source === "/(.*)")?.headers ?? [];

  const server = createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");
    let path = normalize(decodeURIComponent(url.pathname));
    if (path.includes("..")) {
      response.writeHead(400).end();
      return;
    }

    let file = null;
    if (experienceDir && path.startsWith("/assets/js/experience/")) {
      const candidate = join(experienceDir, path.slice("/assets/js/experience/".length));
      file = (await exists(candidate)) ? candidate : null;
    } else {
      const direct = join(root, path);
      const index = join(root, path, "index.html");
      if (await exists(direct)) {
        file = direct;
      } else if (await exists(index)) {
        file = index;
      }
    }

    for (const { key, value } of globalHeaders) {
      response.setHeader(key, value);
    }
    response.setHeader("Cache-Control", "no-store");

    if (!file) {
      response.statusCode = 404;
      response.setHeader("Content-Type", TYPES[".html"]);
      response.end(await readFile(join(root, "404.html")));
      return;
    }

    response.setHeader("Content-Type", TYPES[extname(file)] ?? "application/octet-stream");
    response.end(await readFile(file));
  });

  await new Promise((done) => server.listen(port, "127.0.0.1", done));
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    close: () =>
      new Promise((done) => {
        server.closeAllConnections();
        server.close(done);
      }),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = (name) =>
    process.argv.find((item) => item.startsWith(`--${name}=`))?.split("=")[1];
  const { url } = await serve({
    port: Number(arg("port") ?? 8000),
    root: arg("root") ?? REPO,
    experienceDir: arg("experience-dir") ?? null,
  });
  console.log(url);
}
