const purchasesTable = {
  id: 'purchases',
  data: {
    schema: "public",
    name: "purchases",
    columns: [
      {
        name: "id",
        type: "number",
        key: true
      },
      {
        name: "user_id",
        handleType: "target",
        type: "number"
      },
      {
        name: "product_id",
        handleType: "target",
        type: "number"
      },
    ]
  },
  position: { x: 600, y: 0 },
  type: 'table',
};

export default purchasesTable;
