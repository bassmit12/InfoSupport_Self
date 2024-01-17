import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          "http://infosupport-backend-self.germanywestcentral.azurecontainer.io:5002", // Change the target to your actual server address
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
