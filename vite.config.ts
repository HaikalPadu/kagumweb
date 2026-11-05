import applications from "./server/mail";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
  plugins: [react(), tailwindcss(), { name: "applications-api", configureServer(server) { server.middlewares.use("/api/applications", (req, res) => { void applications(req, res); }); } }],
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
}; });
