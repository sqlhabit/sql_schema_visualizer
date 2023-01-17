const helpersDatesTable = {
  schema: "helpers",
  name: "dates",
  columns: [
    {
      name: "id",
      description: "Unique identifier of a date. Just a primary key, an index of the table.",
      handleType: "source",
      key: true,
      type: "integer"
    },
    {
      name: "date",
      description: "A date. By joining the very sparse timeline data to the consecutive range of dates we won’t have gaps.",
      type: "date"
    }
  ]
};

export default helpersDatesTable;
