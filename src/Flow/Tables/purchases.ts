const purchasesTable = {
  name: "purchases",
  columns: [
    {
      name: "id",
      description: "Unique identifier of purchase.",
      type: "integer",
      key: true
    },
    {
      name: "user_id",
      description: "id of a user who made the purchase.",
      handleType: "target",
      type: "integer"
    },
    {
      name: "product_id",
      description: "id of a product inside products table.",
      handleType: "target",
      type: "integer"
    },
    {
      name: "amount",
      description: "How much money user paid. The number might vary since users could apply discounts. Amount is always in US dollars.",
      type: "float"
    },
    {
      name: "refunded",
      description: "Status of a purchase, we receive money on the bank account only if purchase wasn’t refunded.",
      handleType: "target",
      type: "boolean"
    },
    {
      name: "created_at",
      description: "When purchase was made.",
      type: "datetime"
    },
  ]
};

export default purchasesTable;
