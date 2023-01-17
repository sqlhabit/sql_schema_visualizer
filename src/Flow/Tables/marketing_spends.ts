const marketingSpendsTable = {
  name: "marketing_spends",
  columns: [
    {
      name: "id",
      handleType: "source",
      key: true,
      type: "integer"
    },
    {
      name: "spent_at",
      type: "date"
    },
    {
      name: "amount",
      type: "integer"
    },
    {
      name: "clicks",
      type: "integer"
    },
    {
      name: "utm_source",
      type: "text",
      description: "utm_source in URL when user signed up, used for marketing attribution"
    },
    {
      name: "utm_campaign",
      type: "text",
      description: "utm_campaign in URL when user signed up, used for marketing attribution"
    },
    {
      name: "utm_term",
      type: "text",
      description: "utm_term in URL when user signed up, used for marketing attribution"
    },
    {
      name: "utm_content",
      type: "text",
      description: "utm_content in URL when user signed up, used for marketing attribution"
    },
    {
      name: "utm_medium",
      type: "text",
      description: "utm_medium in URL when user signed up, used for marketing attribution"
    },
  ]
};

export default marketingSpendsTable;
