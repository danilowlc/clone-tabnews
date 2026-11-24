import { resolve } from "node:path";
import database from "infra/database.js";
import { runner } from "node-pg-migrate";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve(process.cwd(), "infra", "migration"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function listPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const pedingMigrations = await runner({
      ...defaultMigrationOptions,
      dbClient,
    });
    return pedingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await runner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });
    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  defaultMigrationOptions,
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
