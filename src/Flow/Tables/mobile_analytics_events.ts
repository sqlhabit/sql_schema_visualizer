const mobileAnalyticsEventsTable = {
  schema: "mobile_analytics",
  name: "events",
  columns: [
    {
      name: "event_id",
      type: "text",
      handleType: "source",
      key: true
    },
    {
      name: "category",
      type: "text"
    },
    {
      name: "action",
      type: "text"
    },
    {
      name: "name",
      type: "text"
    },
    {
      name: "screen_resolution",
      type: "text"
    },
    {
      name: "device_type",
      type: "text"
    },
    {
      name: "user_id",
      type: "integer",
      handleType: "target"
    },
    {
      name: "adid",
      type: "text"
    },
    {
      name: "country",
      type: "text"
    },
    {
      name: "custom_parameters",
      type: "JSON"
    },
    {
      name: "created_at",
      type: "datetime"
    },
    {
      name: "app_version",
      type: "text"
    },
  ]
};

export default mobileAnalyticsEventsTable;
