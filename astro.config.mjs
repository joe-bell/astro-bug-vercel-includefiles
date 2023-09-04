import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

const includeFiles = [
  "src/assets/images/hello-there.jpg",
  ...Object.keys(import.meta.glob("./public/assets/fonts/*")),
];

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel({ functionPerRoute: false, includeFiles }),
});
