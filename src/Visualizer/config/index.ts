import { loadEdgeConfigs } from "../helpers";
import { edges } from "./edges";

export * from "./tables";
export * from "./nodeTypes";
export * from "./tablePositions";
export * from "./schemaColors";

export const edgeConfigs = loadEdgeConfigs(edges);
