const adjustCallbacksTable = {
  schema: "adjust",
  name: "callbacks",
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
      name: "tracker",
      type: "text"
    },
  ]
};

export default adjustCallbacksTable;
