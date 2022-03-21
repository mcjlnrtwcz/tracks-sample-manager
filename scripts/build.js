const esbuild = require("esbuild");

const { options } = require("./esbuild-options.js");

esbuild.build({ ...options, minify: true }).catch(() => process.exit(1));
