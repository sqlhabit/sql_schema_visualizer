const productsTable = {
  name: "products",
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
      name: "price",
      type: "float"
    }
  ]
};

export default productsTable;
