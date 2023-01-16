const booksTable = {
  name: "books",
  columns: [
    {
      name: "id",
      handleType: "source",
      key: true,
      type: "number"
    },
    {
      name: "name",
      type: "string"
    },
    {
      name: "author",
      type: "string"
    },
  ]
};

export default booksTable;
