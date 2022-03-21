const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const cssModulesPlugin = require("esbuild-css-modules-plugin");
const { copy } = require("esbuild-plugin-copy");

const OUTPUT_DIR = "build/";

exports.OUTPUT_DIR = OUTPUT_DIR;

exports.options = {
  entryPoints: ["src/index.jsx"],
  bundle: true,
  metafile: true, // needs to be set for htmlPlugin
  outdir: OUTPUT_DIR, // needs to be set for htmlPlugin
  inject: ["src/preact-shim.js"],
  jsxFactory: "h",
  jsxFragment: "Fragment",
  target: ["es2020"],
  plugins: [
    cssModulesPlugin({
      inject: false,
      localsConvention: "camelCaseOnly",
      v2: true,
    }),
    htmlPlugin({
      files: [
        {
          entryPoints: ["src/index.jsx"],
          filename: "index.html",
          // TODO: can this be loaded from a file?
          htmlTemplate: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <script src="ffmpeg/ffmpeg.min.js"></script>
              </head>
              <body>
                  <div id="root" />
              </body>
              </html>
            `,
        },
      ],
    }),
    copy({
      once: true,
      assets: [
        {
          from: ["./node_modules/@ffmpeg/ffmpeg/dist/**/*"],
          to: ["./ffmpeg"],
          keepStructure: true,
        },
        {
          from: ["./node_modules/@ffmpeg/core/dist/**/*"],
          to: ["./ffmpeg"],
          keepStructure: true,
        },
      ],
    }),
  ],
};
