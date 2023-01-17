const accountsTable = {
  name: "accounts",
  description: "Hello World",
  columns: [
    {
      name: "id",
      handleType: "source",
      key: true,
      type: "integer"
    },
    {
      name: "user_id",
      handleType: "target",
      type: "integer"
    },
    {
      name: "platform",
      type: "text"
    },
    {
      name: "email",
      type: "text"
    },
    {
      name: "created_at",
      type: "datetime"
    },
  ]
};

export default accountsTable;
