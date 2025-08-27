import { env } from "@/data/server.js";
import { drizzle } from "drizzle-orm/singlestore/driver";
import * as schema from "@/drizzle/schema.js";

export const db = drizzle({
  schema,
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
});
