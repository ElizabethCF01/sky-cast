import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(
  globalIgnores(["dist/", "web-build/", "*.cjs"]),
  config,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js"],
        },
      },
    },
  },
)
