const booksUsersTable = {
  name: "books_users",
  columns: [
    {
      name: "book_id",
      handleType: "target",
      type: "integer"
    },
    {
      name: "user_id",
      handleType: "target",
      type: "integer"
    },
    {
      name: "last_page",
      type: "integer"
    },
    {
      name: "created_at",
      type: "datetime"
    },
  ]
};

export default booksUsersTable;
