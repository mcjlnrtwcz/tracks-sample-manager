const esbuild = require("esbuild");
const cssModulesPlugin = require("esbuild-css-modules-plugin");

esbuild.build({
    entryPoints: ["src/index.js"],
    bundle: true,
    // minify: true,
    outdir: "build",
    // sourcemap: true,
    target: ["es2020"],
    loader: { ".js": "jsx" },
    jsxFactory: "h",
    jsxFragment: "Fragment",
    watch: {
        onRebuild(error, result) {
            if (error) console.error("watch build failed:", error);
            else console.log("watch build succeeded:", { warnings: result.warnings });
        },
    },
    plugins: [
        cssModulesPlugin({
            inject: false,
            localsConvention: "camelCaseOnly",
            v2: true
        })
    ]
}).then(result => {
    console.log("watching...");
})
    ;
