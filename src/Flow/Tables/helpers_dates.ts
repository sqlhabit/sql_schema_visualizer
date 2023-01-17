const helpersDatesTable = {
  schema: "helpers",
  name: "dates",
  columns: [
    {
      name: "id",
      handleType: "source",
      key: true,
      type: "integer"
    },
    {
      name: "date",
      type: "date"
    }
  ]
};

export default helpersDatesTable;
