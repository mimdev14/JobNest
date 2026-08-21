import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse a single MongoClient across Next.js dev hot-reloads so we don't
// open a new connection on every file change.
const globalForMongo = globalThis;
const client = globalForMongo._mongoClient ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

const db = client.db(process.env.MONGODB_DB || "job-nest");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    // Most free-tier / standalone MongoDB instances aren't a replica set,
    // so multi-document transactions aren't available. Keep this off
    // unless you know your cluster supports them.
    transaction: false,
  }),
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  // Must be the last plugin -- lets Better Auth set session cookies
  // from within Next.js server actions / route handlers.
  plugins: [nextCookies()],
});
