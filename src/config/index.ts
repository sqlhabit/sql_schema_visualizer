import {
  loadEdgeConfigs,
  loadSchemaColors,
  loadTablePositions,
  loadTables
} from "../Visualizer/helpers";
import { Databases } from "../Visualizer/types/Database";

export * from "./nodeTypes";

const tables = loadTables();
const tablePositions = loadTablePositions();
const schemaColors = loadSchemaColors();
const edgeConfigs = loadEdgeConfigs();

tables.forEach(table => {
  table.schemaColor = schemaColors[table.schema || "DEFAULT"];
});

const bindleDatabase = {
  tables,
  tablePositions,
  edgeConfigs,
  schemaColors
}

export const databases: Databases = {
  bindle: bindleDatabase
};
