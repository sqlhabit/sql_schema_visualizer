const marketingSpendsTable = {
  name: "marketing_spends",
  columns: [
    {
      name: "id",
      description: "Unique identifier of spend, just a primary key in a table.",
      handleType: "source",
      key: true,
      type: "integer"
    },
    {
      name: "spent_at",
      description: "Amount of money Bindle paid to a marketing platform on this date.",
      type: "date"
    },
    {
      name: "amount",
      description: "Amount of money in USD.",
      type: "integer"
    },
    {
      name: "clicks",
      description: "Number of clicks on the ad on this date.",
      type: "integer"
    },
    {
      name: "utm_source",
      description: "utm_source of marketing campaign.",
      type: "text"
    },
    {
      name: "utm_campaign",
      description: "utm_campaign of marketing campaign.",
      type: "text"
    },
    {
      name: "utm_term",
      description: "utm_term of marketing campaign.",
      type: "text"
    },
    {
      name: "utm_content",
      description: "utm_content of marketing campaign.",
      type: "text"
    },
    {
      name: "utm_medium",
      description: "utm_medium of marketing campaign.",
      type: "text"
    },
  ]
};

export default marketingSpendsTable;
