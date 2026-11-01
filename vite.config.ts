import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages hosts this project at /faxina/; Vercel hosts it at /.
const isVercel = process.env.VERCEL === "1";
export default defineConfig({
  base: isVercel ? "/" : "/faxina/",
  plugins: [react(), tailwindcss()]
});
