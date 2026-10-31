/**
 * Bundles the film into assets/js/experience/. The output is committed, because
 * the deploy is an rsync of the checkout with no build step.
 *
 * Two passes: everything behind boot.js gets hashed names, so an old entry can
 * never load a new chunk, and boot.js keeps a stable name for main.js to import.
 *
 *   node build.mjs [--outdir=DIR]
 */

import { rm } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const argOut = process.argv.find((item) => item.startsWith("--outdir="))?.split("=")[1];
const OUT = resolve(argOut ?? resolve(HERE, "../../assets/js/experience"));
const THREE = resolve(HERE, "node_modules/three/src/Three.js");

/*
 * Every material here is a RawShaderMaterial, so three's GLSL library is dead
 * weight that tree-shaking cannot see through. Blanking it saves about 34 KB gzip.
 * This reaches into three's internals, which is why the version is pinned exactly.
 */
const stubThreeGlsl = {
  name: "stub-three-glsl",
  setup(context) {
    context.onResolve({ filter: /^three$/ }, () => ({ path: THREE }));
    context.onLoad({ filter: /three[\\/]src[\\/]renderers[\\/]shaders[\\/]ShaderChunk\.js$/ }, () => ({
      contents: "export const ShaderChunk = {};",
      loader: "js",
    }));
    context.onLoad({ filter: /three[\\/]src[\\/]renderers[\\/]shaders[\\/]ShaderLib\.js$/ }, () => ({
      contents: "export const ShaderLib = {};",
      loader: "js",
    }));
  },
};

const shared = {
  bundle: true,
  format: "esm",
  minify: true,
  target: "es2020",
  legalComments: "none",
  logLevel: "warning",
};

await rm(OUT, { recursive: true, force: true });

const world = await build({
  ...shared,
  entryPoints: [resolve(HERE, "world.js")],
  outdir: OUT,
  splitting: true,
  entryNames: "[name]-[hash]",
  chunkNames: "chunk-[hash]",
  banner: { js: "/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */" },
  plugins: [stubThreeGlsl],
  metafile: true,
});

const entry = Object.entries(world.metafile.outputs).find(([, output]) =>
  output.entryPoint?.endsWith("world.js")
)[0];
const worldFile = basename(entry);

await build({
  ...shared,
  entryPoints: [resolve(HERE, "boot.js")],
  outfile: resolve(OUT, "boot.js"),
  define: { __WORLD_URL__: JSON.stringify(`./${worldFile}`) },
  external: ["./world-*"],
});

console.log(`built ${worldFile} and boot.js in ${OUT}`);
