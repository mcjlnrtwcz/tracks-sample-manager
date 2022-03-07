const finalhandler = require("finalhandler");
const http = require("http");
const serveStatic = require("serve-static");

function setHeaders(res) {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
}

const serve = serveStatic("build", { index: ["index.html"], setHeaders });

const server = http.createServer((req, res) => {
    serve(req, res, finalhandler(req, res));
});

server.listen(8080);
