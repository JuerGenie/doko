import { defineConfig } from "tsup";
// import pkg from "./package.json";
import glob from "glob";

const entry = glob
  .sync("./src/**/*.ts")
  .filter((file) => !file.endsWith(".d.ts"));

export default defineConfig({
  sourcemap: true,
  entry,
  dts: true,
  format: ["esm"],
  // external: Object.keys(pkg.peerDependencies),
  clean: true,
  treeshake: true,
});
