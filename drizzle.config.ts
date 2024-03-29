import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["rija_*"],
} satisfies Config;
