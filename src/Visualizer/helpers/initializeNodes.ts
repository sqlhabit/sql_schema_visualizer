import { fullTableName } from "./fullTableName";
import { Position, TablePositions } from "../types";

export const initializeNodes = (tableConfigs: any[], tablePositions: any) => {
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
