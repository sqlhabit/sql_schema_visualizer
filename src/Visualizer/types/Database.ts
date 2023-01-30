import { EdgeConfig } from "./EdgeConfig";
import { SchemaColors } from "./SchemaColors";
import { TableConfig } from "./TableConfig";
import { TablePositions } from "./TablePositions";

export interface Database {
  tables: TableConfig[],
  edgeConfigs: EdgeConfig[],
  schemaColors: SchemaColors,
  tablePositions: TablePositions
};

export interface Databases {
  [databaseName: string] : Database
};
