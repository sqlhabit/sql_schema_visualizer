import { TableConfig } from "../../../Visualizer/types";

import cartsTable from "./tables/carts.json";
import cartsItemsTable from "./tables/carts_items.json";
import categoriesTable from "./tables/categories.json";
import discountCodesTable from "./tables/discount_codes.json";
import itemsTable from "./tables/items.json";
import purchasesTable from "./tables/purchases.json";
import returnsTable from "./tables/returns.json";
import reviewsTable from "./tables/reviews.json";
import usersTable from "./tables/users.json";
import vendorsTable from "./tables/vendors.json";

const tables: TableConfig[] = [
  cartsTable,
  cartsItemsTable,
  categoriesTable,
  discountCodesTable,
  itemsTable,
  purchasesTable,
  returnsTable,
  reviewsTable,
  usersTable,
  vendorsTable
];

export default tables;
