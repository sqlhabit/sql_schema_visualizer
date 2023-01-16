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
    targetPosition: "right"
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
    targetPosition: "right"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "devices",
    targetKey: "user_id",
    relation: "hasMany",
    targetPosition: "right"
  },
  {
    source: "users",
    sourceKey: "id",
    target: "adjust.callbacks",
    targetKey: "user_id",
    relation: "hasMany",
    targetPosition: "left"
  },
]

export default edges;
