import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  copy: ["src/types.ts"],
  nodeProtocol: "strip",
  clean: true,
  dts: true,
  exports: true,
});
