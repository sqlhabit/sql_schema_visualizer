import {
  loadEdgeConfigs,
  loadSchemaColors
} from "../Visualizer/helpers";

export * from "./tables";
export * from "./nodeTypes";
export * from "./tablePositions";

export const schemaColors = loadSchemaColors();
export const edgeConfigs = loadEdgeConfigs();
