import fullTableName from "./fullTableName";

interface EdgeConfig {
  source: string
  sourceKey: string;
  target: string;
  targetKey: string;
  relation: string;
  sourcePosition?: string;
  targetPosition?: string;
}

const loadEdgeConfigs = (edgeConfigs: EdgeConfig[]) => {
  edgeConfigs.forEach(edgeConfig => {
    const sourceTableName = fullTableName(edgeConfig.source);
    const targetTableName = fullTableName(edgeConfig.target);

    edgeConfig.source = sourceTableName;
    edgeConfig.target = targetTableName;
  });
}

export default loadEdgeConfigs;
