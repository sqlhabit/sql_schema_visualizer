import { TableConfig } from "../../../Visualizer/types";

import accountsTable from "./tables/accounts.json";
import adjustCallbacksTable from "./tables/adjust_callbacks.json";
import booksUsersTable from "./tables/books_users.json";
import booksTable from "./tables/books.json";
import devicesTable from "./tables/devices.json";
import helpersDatesTable from "./tables/helpers_dates.json";
import marketingSpendsTable from "./tables/marketing_spends.json";
import mobileAnalyticsEventsTable from "./tables/mobile_analytics_events.json";
import productsTable from "./tables/products.json";
import profilesTable from "./tables/profiles.json";
import purchasesTable from "./tables/purchases.json";
import usersTable from "./tables/users.json";
import webAnalyticsEventsTable from "./tables/web_analytics_events.json";
import webAnalyticsPageviewsTable from "./tables/web_analytics_pageviews.json";

const tables: TableConfig[] = [
  accountsTable,
  adjustCallbacksTable,
  booksUsersTable,
  booksTable,
  devicesTable,
  helpersDatesTable,
  marketingSpendsTable,
  mobileAnalyticsEventsTable,
  productsTable,
  profilesTable,
  purchasesTable,
  usersTable,
  webAnalyticsEventsTable,
  webAnalyticsPageviewsTable
];

export default tables;
