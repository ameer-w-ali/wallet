import type { Config } from "tailwindcss";
import commonConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.tsx"],
  presets: [commonConfig],
};

export default config;
