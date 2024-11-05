import { TableConfig } from "../../../Visualizer/types";

import productsTable from "./tables/products.json";
import purchasesTable from "./tables/purchases.json";
import trialsTable from "./tables/trials.json";
import usersTable from "./tables/users.json";
import mobileAnalyticsEventsTable from "./tables/mobile_analytics_events.json";

const tables: TableConfig[] = [
  productsTable,
  purchasesTable,
  trialsTable,
  usersTable,
  mobileAnalyticsEventsTable
];

export default tables;
