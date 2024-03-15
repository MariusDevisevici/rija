import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        ["primary"]: "#0065ff",
        ["secondary"]: "#0747a6",
        ["secondary-dark"]: "#083377",
      },
    },
  },
  plugins: [],
} satisfies Config;
