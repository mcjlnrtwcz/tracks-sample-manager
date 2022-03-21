const esbuild = require("esbuild");
const finalhandler = require("finalhandler");
const http = require("http");
const serveStatic = require("serve-static");

const { options, OUTPUT_DIR } = require("./esbuild-options.js");

function setHeaders(res) {
  // Required by ffmpeg wasm library
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
}

esbuild
  .build({
    ...options,
    watch: {
      onRebuild(error, result) {
        error
          ? console.error("watch build failed:", error)
          : console.log("watch build succeeded:", {
              warnings: result.warnings,
            });
      },
    },
  })
  .then(() => {
    const serve = serveStatic(OUTPUT_DIR, {
      index: ["index.html"],
      setHeaders,
    });
    const server = http.createServer((req, res) => {
      serve(req, res, finalhandler(req, res));
    });
    server.listen(8080);
  })
  .catch(() => process.exit(1));
