const profilesTable = {
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
};

export default profilesTable;
