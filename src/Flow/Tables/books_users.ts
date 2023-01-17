const booksUsersTable = {
  name: "books_users",
  columns: [
    {
      name: "book_id",
      description: "User’s id.",
      handleType: "target",
      type: "integer"
    },
    {
      name: "user_id",
      description: "Book’s id.",
      handleType: "target",
      type: "integer"
    },
    {
      name: "last_page",
      description: "The number of the last page user read in the book.",
      type: "integer"
    },
    {
      name: "created_at",
      description: "When user started reading the book.",
      type: "datetime"
    },
  ]
};

export default booksUsersTable;
