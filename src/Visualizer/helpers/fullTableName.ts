export const fullTableName = (tableName: string, schemaName = "public") => {
  if(tableName.includes(".")) {
    return tableName;
  } else {
    return `${schemaName}.${tableName}`;
  }
};
