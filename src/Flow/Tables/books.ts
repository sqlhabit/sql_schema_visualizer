const booksTable = {
  name: "books",
  columns: [
    {
      name: "id",
      handleType: "source",
      key: true,
      type: "integer"
    },
    {
      name: "name",
      type: "text"
    },
    {
      name: "slug",
      type: "text"
    },
    {
      name: "genre",
      type: "text"
    },
    {
      name: "pages_count",
      type: "integer"
    },
  ]
};

export default booksTable;
