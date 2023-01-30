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
export const schemaColors = loadSchemaColors();
const edgeConfigs = loadEdgeConfigs();

const bindleDatabase = {
  tables,
  tablePositions,
  edgeConfigs,
  schemaColors
}

export const databases: Databases = {
  bindle: bindleDatabase
};
