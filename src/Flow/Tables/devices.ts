const devicesTable = {
  id: 'devices',
  data: {
    schema: "public",
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
  },
  position: { x: 432, y: -448 },
  type: 'table'
};

export default devicesTable;
