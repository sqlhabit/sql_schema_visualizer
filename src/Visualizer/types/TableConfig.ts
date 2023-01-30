import { TableColumnConfig } from "./TableColumnConfig";

export interface TableConfig {
  schema?: string;
  schemaColor?: string;
  name: string;
  description?: string;
  columns: TableColumnConfig[];
}
