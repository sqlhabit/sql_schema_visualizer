import { fullTableName } from "./fullTableName";

// TODO: Extract to file
interface Position {
  x: number;
  y: number;
};

interface Positions {
  tableName: Position;
};

export const initializeNodes = (tableConfigs: any[], tablePositions: any) => {
  const tables = [] as any;
  const tablePositionsWithSchema = {} as Positions;

  Object.entries(tablePositions).forEach(params => {
    const tableName = params[0];
    const position = params[1] as Position;

    if(tableName.includes(".")) {
      tablePositionsWithSchema[tableName as keyof Positions] = position;
    } else {
      tablePositionsWithSchema[fullTableName(tableName) as keyof Positions] = position;
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
