import { fullTableName } from "./fullTableName";
import { EdgeConfig } from "../types";
import { load as loadJson } from 'js-yaml';
import edgeConfigsFile from "./edges.yaml";

export const loadEdgeConfigs = () => {
  let err = loadJson(edgeConfigsFile);

  console.log(err);

  // edgeConfigs.forEach((edgeConfig: EdgeConfig) => {
  //   const sourceTableName = fullTableName(edgeConfig.source);
  //   const targetTableName = fullTableName(edgeConfig.target);

  //   edgeConfig.source = sourceTableName;
  //   edgeConfig.target = targetTableName;
  // });

  const edges: EdgeConfig[] = [];

  return edges;
}
