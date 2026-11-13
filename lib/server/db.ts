// One MongoDB connection, reused across requests (and across hot reloads in development).
import { MongoClient, type Db } from "mongodb";

const g = globalThis as unknown as { __solucioMongo?: Promise<MongoClient> };

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  g.__solucioMongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect();
  const client = await g.__solucioMongo;
  return client.db(); // database named in the URI
}

export async function closeDb() {
  if (g.__solucioMongo) await (await g.__solucioMongo).close();
  g.__solucioMongo = undefined;
}
