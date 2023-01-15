const usersTable = {
  id: 'users',
  data: {
    name: "users",
    columns: [
      {
        name: "id",
        handleType: "source",
        key: true,
        description: "Primary key of the users table. An integer. Use it to join with other tables.",
        type: "number"
      },
      {
        name: "email",
        type: "string"
      },
      {
        name: "name",
        type: "string"
      }
    ]
  },
  position: { x: 0, y: 0 },
  type: 'table',
};

export default usersTable;
