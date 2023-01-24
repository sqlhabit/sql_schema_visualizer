import {
  loadEdgeConfigs,
  loadSchemaColors,
  loadTablePositions
} from "../Visualizer/helpers";

export * from "./tables";
export * from "./nodeTypes";

export const tablePositions = loadTablePositions();
export const schemaColors = loadSchemaColors();
export const edgeConfigs = loadEdgeConfigs();
