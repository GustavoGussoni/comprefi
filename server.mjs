import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(__dirname, "dist");
const indexFile = path.join(distDirectory, "index.html");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(request, response, filePath, fileStats) {
  const extension = path.extname(filePath).toLowerCase();
  const isVersionedAsset = filePath.startsWith(path.join(distDirectory, "assets"));

  response.writeHead(200, {
    "Content-Length": fileStats.size,
    "Content-Type": contentTypes[extension] || "application/octet-stream",
    "Cache-Control": isVersionedAsset
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

async function resolveStaticFile(pathname) {
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const candidate = path.resolve(distDirectory, relativePath);

  if (
    candidate !== distDirectory &&
    !candidate.startsWith(`${distDirectory}${path.sep}`)
  ) {
    return null;
  }

  try {
    const fileStats = await stat(candidate);
    return fileStats.isFile() ? { filePath: candidate, fileStats } : null;
  } catch {
    return null;
  }
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");

    if (requestUrl.pathname === "/healthz") {
      const body = JSON.stringify({ status: "healthy", service: "comprefi-frontend" });
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(body),
        "Cache-Control": "no-store",
      });
      response.end(request.method === "HEAD" ? undefined : body);
      return;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end("Method Not Allowed");
      return;
    }

    const pathname = decodeURIComponent(requestUrl.pathname);
    const staticFile = await resolveStaticFile(pathname);

    if (staticFile) {
      sendFile(request, response, staticFile.filePath, staticFile.fileStats);
      return;
    }

    if (pathname.startsWith("/assets/")) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    const indexStats = await stat(indexFile);
    sendFile(request, response, indexFile, indexStats);
  } catch (error) {
    console.error("Failed to serve request", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Internal Server Error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`CompreFi frontend listening on port ${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
