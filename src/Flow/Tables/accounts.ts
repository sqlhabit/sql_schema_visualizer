const accountsTable = {
  id: 'accounts',
  data: {
    name: "accounts",
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
  },
  position: { x: 450, y: -250 },
  type: 'table'
};

export default accountsTable;