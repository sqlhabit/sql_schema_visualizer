import { DatabaseConfigs } from "../types";
import { loadDatabaseConfig } from "../helpers";
import databases from "../../config/databases.json";

export const loadDatabases = async () => {
  const databaseConfigs: DatabaseConfigs = {};

  for (const databaseName of Object.keys(databases)) {
    const databaseConfig = await loadDatabaseConfig(databaseName);

    databaseConfigs[databaseName] = databaseConfig;
  }

  return databaseConfigs;
};
