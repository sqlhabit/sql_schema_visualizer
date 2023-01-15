const productsTable = {
  id: 'products',
  data: {
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
  },
  position: { x: 320, y: 160 },
  type: 'table',
};

export default productsTable;
