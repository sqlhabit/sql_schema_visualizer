import { loadEdgeConfigs } from "../helpers";
import { edges } from "./edges";

export { tables } from "./tables";
export { nodeTypes } from "./nodeTypes";
export { tablePositions } from "./tablePositions";
export { schemaColors } from "./schemaColors";

export const edgeConfigs = loadEdgeConfigs(edges);
