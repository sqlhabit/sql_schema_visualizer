import { Databases } from "../types";
import { loadDatabaseConfig } from "../helpers";
import databaseNames from "../../config/databases.json";

export const loadDatabases = async () => {
  const databases: Databases = {};

  for (const databaseName of databaseNames) {
    const databaseConfig = await loadDatabaseConfig(databaseName);

    databases[databaseName] = databaseConfig;
  }

  return databases;
};
