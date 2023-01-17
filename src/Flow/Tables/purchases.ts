const purchasesTable = {
  name: "purchases",
  columns: [
    {
      name: "id",
      type: "integer",
      key: true
    },
    {
      name: "user_id",
      handleType: "target",
      type: "integer"
    },
    {
      name: "product_id",
      handleType: "target",
      type: "integer"
    },
    {
      name: "amount",
      type: "float"
    },
    {
      name: "refunded",
      handleType: "target",
      type: "boolean"
    },
    {
      name: "created_at",
      type: "datetime"
    },
  ]
};

export default purchasesTable;
