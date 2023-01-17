const webAnalyticsEventsTable = {
  schema: "web_analytics",
  name: "events",
  columns: [
    {
      name: "pageview_id",
      type: "text",
      handleType: "target"
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
      name: "created_at",
      type: "datetime"
    }
  ]
};

export default webAnalyticsEventsTable;
