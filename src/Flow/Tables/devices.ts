const devicesTable = {
  name: "devices",
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
      name: "device_type",
      type: "text"
    },
    {
      name: "connected_at",
      type: "datetime"
    },
    {
      name: "version",
      type: "text"
    },
  ]
};

export default devicesTable;
