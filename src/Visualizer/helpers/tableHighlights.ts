const currentUrl = new URL(window.location.href)
const urlParams = currentUrl.searchParams
const highlights = (urlParams.get("highlights") || "").split(";").reduce((acc: { [key: string]: string[] }, section: string) => {
  const [tableName, fields] = section.split(":");

  if (tableName && fields) {
    acc[tableName] = fields.split(",");
  }

  return acc;
}, {} as { [key: string]: string[] });

export const isTableHighlighted = ({ schema, tableName }: { schema: string | undefined, tableName: string }) => {
  const fullTableName = schema ? `${schema}.${tableName}` : tableName

  return highlights.hasOwnProperty(fullTableName);
}

export const isColumnHighlighted = ({ schema, tableName, columnName }: { schema: string | undefined, tableName: string, columnName: string }) => {
  const fullTableName = schema ? `${schema}.${tableName}` : tableName

  return highlights[fullTableName]?.includes(columnName);
}
