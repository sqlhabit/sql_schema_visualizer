import { EdgeConfig } from "./EdgeConfig";
import { SchemaColors } from "./SchemaColors";
import { TableConfig } from "./TableConfig";
import { TablePositions } from "./TablePositions";

export type Database = {
  name: string;
  description: string;
};

export type Databases = {
  [databaseName: string] : Database
};

export type DatabaseConfig = {
  tables: TableConfig[],
  edgeConfigs: EdgeConfig[],
  schemaColors: SchemaColors,
  tablePositions: TablePositions
};

export type DatabaseConfigs = {
  [databaseName: string] : DatabaseConfig
};
