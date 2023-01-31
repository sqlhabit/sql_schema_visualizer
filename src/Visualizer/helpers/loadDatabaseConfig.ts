import { EdgeConfig, SchemaColors, TableConfig, TablePositions } from "../types";
import { fullTableName } from "./fullTableName";

export const loadDatabaseConfig = async (databaseName: string) => {
  const edgeConfigs = (await import(`../../config/databases/${databaseName}/edges.json`)).default as EdgeConfig[];
  const tablePositions = (await import(`../../config/databases/${databaseName}/tablePositions.json`)).default as TablePositions;
  const schemaColors = (await import(`../../config/databases/${databaseName}/schemaColors.json`)).default as SchemaColors;
  const tables = (await import(`../../config/databases/${databaseName}/tables`)).default as TableConfig[];

  edgeConfigs.forEach((edgeConfig: EdgeConfig) => {
    const sourceTableName = fullTableName(edgeConfig.source);
    const targetTableName = fullTableName(edgeConfig.target);

    edgeConfig.source = sourceTableName;
    edgeConfig.target = targetTableName;
  });

  tables.forEach(table => {
    table.schemaColor = schemaColors[table.schema || "DEFAULT"];
  });

  return {
    tables,
    tablePositions,
    edgeConfigs,
    schemaColors
  };
}
