import { TableConfig } from "../../../Visualizer/types";

import productsTable from "./tables/products.json";
import purchasesTable from "./tables/purchases.json";
import trialsTable from "./tables/trials.json";
import usersTable from "./tables/users.json";

const tables: TableConfig[] = [
  productsTable,
  purchasesTable,
  trialsTable,
  usersTable
];

export default tables;
