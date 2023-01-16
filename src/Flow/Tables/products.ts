const productsTable = {
  name: "products",
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
      name: "price",
      type: "number"
    }
  ]
};

export default productsTable;
