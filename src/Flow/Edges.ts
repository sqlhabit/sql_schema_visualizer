const edges = [
  {
    source: "users",
    sourceKey: "id",
    target: "purchases",
    targetKey: "user_id",
    relation: "hasMany",
    targetPosition: "right"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "books_users",
    targetKey: "user_id",
    relation: "hasMany",
    targetPosition: "left"
  },
  {
    source: "products",
    sourceKey: "id",
    target: "purchases",
    targetKey: "product_id",
    relation: "hasMany",
    targetPosition: "left"
  },
  {
    source: "books",
    sourceKey: "id",
    target: "books_users",
    targetKey: "book_id",
    relation: "hasMany",
    targetPosition: "right"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "profiles",
    targetKey: "user_id",
    relation: "hasOne",
    targetPosition: "left"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "accounts",
    targetKey: "user_id",
    relation: "hasOne",
    targetPosition: "left"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "devices",
    targetKey: "user_id",
    relation: "hasMany",
    targetPosition: "left"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "adjust.callbacks",
    targetKey: "user_id",
    relation: "hasMany",
    targetPosition: "right"
  },
  {
    source: "users",
    sourceKey: "visitor_id",
    target: "web_analytics.pageviews",
    targetKey: "visitor_id",
    relation: "hasMany",
    targetPosition: "left"
  },
  {
    source: "web_analytics.pageviews",
    sourceKey: "pageview_id",
    target: "web_analytics.events",
    targetKey: "pageview_id",
    relation: "hasMany",
    targetPosition: "left"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "mobile_analytics.events",
    targetKey: "user_id",
    relation: "hasMany",
    targetPosition: "right"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "users",
    targetKey: "referrer_id",
    relation: "hasMany",
    sourcePosition: "left",
    targetPosition: "right"
  },
]

export default edges;
