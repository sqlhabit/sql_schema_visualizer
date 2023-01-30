import { fullTableName } from "./fullTableName";
import { EdgeConfig } from "../types";
import edgeConfigs from "../../config/databases/bindle/edges.json";

export const loadEdgeConfigs = (): EdgeConfig[] => {
  edgeConfigs.forEach((edgeConfig: EdgeConfig) => {
    const sourceTableName = fullTableName(edgeConfig.source);
    const targetTableName = fullTableName(edgeConfig.target);

    edgeConfig.source = sourceTableName;
    edgeConfig.target = targetTableName;
  });

  return edgeConfigs;
}
