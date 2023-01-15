const booksUsersTable = {
  id: 'books_users',
  data: {
    name: "books_users",
    columns: [
      {
        name: "book_id",
        handleType: "target",
        type: "number"
      },
      {
        name: "user_id",
        handleType: "target",
        type: "number"
      },
    ]
  },
  position: { x: 100, y: 0 },
  type: 'table',
};

export default booksUsersTable;
