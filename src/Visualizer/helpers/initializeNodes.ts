import { fullTableName } from "./fullTableName";
import { EdgeConfig, Position, TableConfig, TablePositions } from "../types";

const setHandleType = (tableConfigs: TableConfig[], tableName: string, columnName: string, handleType: string) => {
  tableConfigs.forEach(tableConfig => {
    const configTableName = fullTableName(tableConfig.name, tableConfig.schema || "public");

    if(configTableName === tableName) {
      tableConfig.columns.forEach((columnConfig: any) => {
        if(columnConfig.name === columnName) {
          columnConfig.handleType = handleType;
        }
      });
    }
  });
};

export const initializeNodes = (tableConfigs: TableConfig[], tablePositions: TablePositions, edgeConfigs: EdgeConfig[]) => {
  const tables = [] as any;
  const tablePositionsWithSchema = {} as TablePositions;

  Object.entries(tablePositions).forEach(params => {
    const tableName = params[0];
    const position = params[1] as Position;

    if(tableName.includes(".")) {
      tablePositionsWithSchema[tableName as keyof TablePositions] = position;
    } else {
      tablePositionsWithSchema[fullTableName(tableName) as keyof TablePositions] = position;
    }
  });

  edgeConfigs.forEach(edgeConfig => {
    const sourceTableName = fullTableName(edgeConfig.source);
    setHandleType(tableConfigs, sourceTableName, edgeConfig.sourceKey, "source");

    const targetTableName = fullTableName(edgeConfig.target);
    setHandleType(tableConfigs, targetTableName, edgeConfig.targetKey, "target");
  });

  tableConfigs.forEach(tableConfig => {
    const schemaName = tableConfig.schema || "public";
    const tableID = fullTableName(tableConfig.name, schemaName);

    const tableDefinition = {
      id: tableID,
      data: tableConfig,
      position: (tablePositionsWithSchema as any)[tableID] || { x: 0, y: 0 },
      type: "table"
    }

    tables.push(tableDefinition);
  });

  return tables;
};
