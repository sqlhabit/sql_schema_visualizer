// import React from 'react';
import {
  loadEdgeConfigs,
  loadSchemaColors,
  loadTablePositions
} from "../Visualizer/helpers";
// import { TableConfig } from "../Visualizer/types";
import { Databases } from "../Visualizer/types/Database";

export * from "./nodeTypes";

const tablePositions = loadTablePositions();
const schemaColors = loadSchemaColors();
const edgeConfigs = loadEdgeConfigs();

(async () => {
  const dynamicEdgeConfigs = await require("./databases/bindle/edges.json");
  console.log(dynamicEdgeConfigs);
  // const dynamicTables = await require("./databases/bindle/tables");
  // const dynamicTables = React.lazy(() => import("./databases/bindle/tables"));
  // console.log(dynamicTables)

  // const dynamicTables = React.lazy(() => import("./databases/bindle/tables"));
  // console.log(dynamicTables);
  const dynamicTables = await import("./databases/bindle/tables");
  console.log(dynamicTables);
})();

const bindleDatabase = {
  tables: [],
  tablePositions,
  edgeConfigs,
  schemaColors
}

export const databases: Databases = {
  bindle: bindleDatabase
};
