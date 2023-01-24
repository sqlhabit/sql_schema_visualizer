import {
  loadEdgeConfigs,
  loadSchemaColors,
  loadTablePositions,
  loadTables
} from "../Visualizer/helpers";

export * from "./nodeTypes";

export const tables = loadTables();
export const tablePositions = loadTablePositions();
export const schemaColors = loadSchemaColors();
export const edgeConfigs = loadEdgeConfigs();
