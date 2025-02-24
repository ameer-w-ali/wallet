import type { Config } from "tailwindcss";
import commonConfig from "@repo/tailwind-config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  presets: [commonConfig],
};

export default config;
