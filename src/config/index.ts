import { Databases } from "../Visualizer/types";
import { loadDatabaseConfig } from "../Visualizer/helpers";
import databaseName from "./databases.json";

const databases: Databases = {};

databaseName.forEach(async databaseName => {
  databases[databaseName] = await loadDatabaseConfig(databaseName);
});

export default databases;
