const marketingSpendsTable = {
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
};

export default marketingSpendsTable;
