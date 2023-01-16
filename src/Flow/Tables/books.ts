const booksTable = {
  id: 'books',
  data: {
    schema: "public",
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
  },
  position: { x: -100, y: 100 },
  type: 'table',
};

export default booksTable;
