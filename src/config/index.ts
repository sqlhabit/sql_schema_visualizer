import { Databases } from "../Visualizer/types/Database";
import { loadDatabaseConfig } from "../Visualizer/helpers/loadDatabaseConfig";
import databaseName from "./databases.json";

const databases: Databases = {};

databaseName.forEach(async databaseName => {
  databases[databaseName] = await loadDatabaseConfig(databaseName);
});

export default databases;
