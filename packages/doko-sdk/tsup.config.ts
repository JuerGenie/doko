import { defineConfig } from "tsup";
import pkg from "./package.json";

export default defineConfig({
  sourcemap: true,
  entry: ["./src/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  external: Object.keys(pkg.peerDependencies),
  clean: true,
});
