import { TableConfig } from "../types";

import accountsTable from "../../config/databases/bindle/tables/accounts.json";
import adjustCallbacksTable from "../../config/databases/bindle/tables/adjust_callbacks.json";
import booksUsersTable from "../../config/databases/bindle/tables/books_users.json";
import booksTable from "../../config/databases/bindle/tables/books.json";
import devicesTable from "../../config/databases/bindle/tables/devices.json";
import helpersDatesTable from "../../config/databases/bindle/tables/helpers_dates.json";
import marketingSpendsTable from "../../config/databases/bindle/tables/marketing_spends.json";
import mobileAnalyticsEventsTable from "../../config/databases/bindle/tables/mobile_analytics_events.json";
import productsTable from "../../config/databases/bindle/tables/products.json";
import profilesTable from "../../config/databases/bindle/tables/profiles.json";
import purchasesTable from "../../config/databases/bindle/tables/purchases.json";
import usersTable from "../../config/databases/bindle/tables/users.json";
import webAnalyticsEventsTable from "../../config/databases/bindle/tables/web_analytics_events.json";
import webAnalyticsPageviewsTable from "../../config/databases/bindle/tables/web_analytics_pageviews.json";

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
