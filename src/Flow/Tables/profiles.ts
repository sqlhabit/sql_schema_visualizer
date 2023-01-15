const profilesTable = {
  id: 'profiles',
  data: {
    name: "profiles",
    columns: [
      {
        name: "id",
        handleType: "source",
        key: true,
        type: "number"
      },
      {
        name: "user_id",
        handleType: "target",
        type: "number"
      },
      {
        name: "about",
        type: "string"
      },
    ]
  },
  position: { x: -100, y: -150 },
  type: 'table'
};

export default profilesTable;
