import { defineConfig } from "astro/config";
import subsetFonts from "./integrations/subset-fonts.mjs";

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  output: "static",
  build: {
    format: "directory",
  },
  integrations: [subsetFonts()],
});
