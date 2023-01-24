import { TableConfig } from "../types";

import accountsTable from "../../config/tables/accounts.json";
import adjustCallbacksTable from "../../config/tables/adjust_callbacks.json";
import booksUsersTable from "../../config/tables/books_users.json";
import booksTable from "../../config/tables/books.json";
import devicesTable from "../../config/tables/devices.json";
import helpersDatesTable from "../../config/tables/helpers_dates.json";
import marketingSpendsTable from "../../config/tables/marketing_spends.json";
import mobileAnalyticsEventsTable from "../../config/tables/mobile_analytics_events.json";
import productsTable from "../../config/tables/products.json";
import profilesTable from "../../config/tables/profiles.json";
import purchasesTable from "../../config/tables/purchases.json";
import usersTable from "../../config/tables/users.json";
import webAnalyticsEventsTable from "../../config/tables/web_analytics_events.json";
import webAnalyticsPageviewsTable from "../../config/tables/web_analytics_pageviews.json";

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


export const loadTables = () => {
  return tables;
};
