const accountsTable = {
  name: "accounts",
  description: "Hello World",
  columns: [
    {
      name: "id",
      handleType: "source",
      key: true,
      type: "number"
    },
    {
      name: "user_id",
      handleType: "target",
      type: "number"
    },
    {
      name: "platform",
      type: "string"
    },
  ]
};

export default accountsTable;
