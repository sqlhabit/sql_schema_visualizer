const adjustCallbacksTable = {
  schema: "adjust",
  name: "callbacks",
  columns: [
    {
      name: "id",
      type: "integer",
      handleType: "source",
      key: true
    },
    {
      name: "tracker",
      type: "text"
    },
    {
      name: "created_at",
      type: "datetime"
    },
    {
      name: "campaign_name",
      type: "text"
    },
    {
      name: "adgroup_name",
      type: "text"
    },
    {
      name: "creative_name",
      type: "text"
    },
    {
      name: "label",
      type: "text"
    },
    {
      name: "device_name",
      type: "text"
    },
    {
      name: "app_version",
      type: "text"
    },
    {
      name: "activity_kind",
      type: "text"
    },
    {
      name: "event_name",
      type: "text"
    },
    {
      name: "adid",
      type: "text"
    },
    {
      name: "user_id",
      type: "integer",
      handleType: "target"
    },
    {
      name: "country",
      type: "text"
    },
  ]
};

export default adjustCallbacksTable;
