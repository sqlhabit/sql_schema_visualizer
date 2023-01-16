const marketingSpendsTable = {
  id: 'marketing_spends',
  data: {
    schema: "public",
    name: "marketing_spends",
    columns: [
      {
        name: "id",
        handleType: "source",
        key: true,
        type: "number"
      },
      {
        name: "spent_at",
        type: "date"
      },
      {
        name: "amount",
        type: "number"
      },
      {
        name: "clicks",
        type: "number"
      },
    ]
  },
  position: { x: 160, y: -336 },
  type: 'table'
};

export default marketingSpendsTable;
