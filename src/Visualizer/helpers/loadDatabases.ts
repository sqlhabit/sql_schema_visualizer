import { DatabaseConfigs, DatabaseConfig } from "../types";
import { loadDatabaseConfig } from "../helpers";
import databases from "../../config/databases";

// Load all databases at once (old approach - kept for backwards compatibility)
export const loadDatabases = async () => {
  const databaseConfigs: DatabaseConfigs = {};

  for (const databaseName of Object.keys(databases)) {
    const databaseConfig = await loadDatabaseConfig(databaseName);

    databaseConfigs[databaseName] = databaseConfig;
  }

  return databaseConfigs;
};

// Load a single database on demand (optimized approach)
export const loadDatabase = async (databaseName: string): Promise<DatabaseConfig | null> => {
  if (!(databaseName in databases)) {
    return null;
  }

  return await loadDatabaseConfig(databaseName);
};
