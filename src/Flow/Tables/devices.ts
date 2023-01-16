const devicesTable = {
  name: "devices",
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
      name: "device_type",
      type: "string"
    },
    {
      name: "connected_at",
      type: "datetime"
    }
  ]
};

export default devicesTable;
