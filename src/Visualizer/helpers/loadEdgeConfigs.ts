import { fullTableName } from "./fullTableName";
import { EdgeConfig } from "../types";

export const loadEdgeConfigs = (edgeConfigs: EdgeConfig[]) => {
  edgeConfigs.forEach(edgeConfig => {
    const sourceTableName = fullTableName(edgeConfig.source);
    const targetTableName = fullTableName(edgeConfig.target);

    edgeConfig.source = sourceTableName;
    edgeConfig.target = targetTableName;
  });

  return edgeConfigs;
}
