import { TableColumnConfig } from "./TableColumnConfig";

export interface TableConfig {
  schema?: string;
  name: string;
  description?: string;
  columns: TableColumnConfig[];
}
