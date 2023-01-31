import { Databases } from "../Visualizer/types";
import { loadDatabaseConfig } from "../Visualizer/helpers";
import databaseNames from "./databases.json";

const databases: Databases = {};

databaseNames.forEach(async databaseName => {
  const databaseConfig = await loadDatabaseConfig(databaseName);

  databases[databaseName] = databaseConfig;
});

export default databases;
