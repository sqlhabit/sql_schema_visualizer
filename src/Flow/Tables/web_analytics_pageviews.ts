const webAnalyticsPageviewsTable = {
  schema: "web_analytics",
  name: "pageviews",
  columns: [
    {
      name: "pageview_id",
      type: "text",
      handleType: "source",
      key: true
    },
    {
      name: "visitor_id",
      type: "text",
      handleType: "target"
    },
    {
      name: "url",
      type: "text"
    },
    {
      name: "referer_url",
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
      name: "custom_parameters",
      type: "JSON"
    },
    {
      name: "created_at",
      type: "datetime"
    },
    {
      name: "country",
      type: "text"
    },
  ]
};

export default webAnalyticsPageviewsTable;
