import { TableConfig } from "../../../Visualizer/types";

import arInternalMetadataTable from "./tables/ar_internal_metadata.json";
import schemaMigrationsTable from "./tables/schema_migrations.json";
import transactionsTable from "./tables/transactions.json";
import vendorsTable from "./tables/vendors.json";

const tables: TableConfig[] = [
  arInternalMetadataTable,
  schemaMigrationsTable,
  transactionsTable,
  vendorsTable
];

export default tables;
