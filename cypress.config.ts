import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    env: {
      apiUrl: "https://norma.nomoreparties.space/api",
    },
    setupNodeEvents(on, config) {
    },
  },
});