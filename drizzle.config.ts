import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  strict: true,
  verbose: true,
  dbCredentials: {
    // host: env.DB_HOST || "",
    port: 5432,
    host: process.env.DB_HOST || "",
    // database: env.DB_NAME || "",
    database: process.env.DB_NAME || "",
    // user: env.DB_USER || "",
    user: process.env.DB_USER || "",
    // password: env.DB_PASSWORD || "",
    password: process.env.DB_PASSWORD || "",
    ssl: false,
  },
});
