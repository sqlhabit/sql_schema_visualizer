import { fullTableName } from "../Visualizer/helpers/fullTableName";
import { EdgeConfig, SchemaColors, TableConfig, TablePositions } from "../Visualizer/types";
import { Databases } from "../Visualizer/types/Database";

const databases: Databases = {};
const DATABASE_NAMES = ["bindle"];

DATABASE_NAMES.forEach(async databaseName => {
  const edgeConfigs = (await import("./databases/bindle/edges.json")).default as EdgeConfig[];
  const tablePositions = (await import("./databases/bindle/tablePositions.json")).default as TablePositions;
  const schemaColors = (await import("./databases/bindle/schemaColors.json")).default as SchemaColors;
  const tables = (await import("./databases/bindle/tables")).default as TableConfig[];

  edgeConfigs.forEach((edgeConfig: EdgeConfig) => {
    const sourceTableName = fullTableName(edgeConfig.source);
    const targetTableName = fullTableName(edgeConfig.target);

    edgeConfig.source = sourceTableName;
    edgeConfig.target = targetTableName;
  });

  tables.forEach(table => {
    table.schemaColor = schemaColors[table.schema || "DEFAULT"];
  });

  databases[databaseName] = {
    tables,
    tablePositions,
    edgeConfigs,
    schemaColors
  }
});

export default databases;
