import { TableConfig } from "../../../Visualizer/types";

import accountsTable from "./tables/accounts.json";
import vaultsTable from "./tables/vaults.json";
import safeDepositBoxesTable from "./tables/safe_deposit_boxes.json";
import eventLogTable from "./tables/event_log.json";
import employeesTable from "./tables/employees.json";
import casesTable from "./tables/cases.json";
import crimeTypesTable from "./tables/crime_types.json";
import criminalsTable from "./tables/criminals.json";
import criminalAliasesTable from "./tables/criminal_aliases.json";
import casesCrimeTypesTable from "./tables/cases_crime_types.json";
import casesCriminalsTable from "./tables/cases_criminals.json";

const tables: TableConfig[] = [
  accountsTable,
  vaultsTable,
  safeDepositBoxesTable,
  eventLogTable,
  employeesTable,
  casesTable,
  crimeTypesTable,
  criminalsTable,
  criminalAliasesTable,
  casesCrimeTypesTable,
  casesCriminalsTable
];

export default tables;
