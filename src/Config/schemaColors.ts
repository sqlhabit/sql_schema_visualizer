interface SchemaColorsDictionary {
  [schemaName: string] : string
}

// Get some color inspiration at https://coolors.co/generate
const schemaColors: SchemaColorsDictionary = {
  "DEFAULT": "#91C4F2",
  "public": "#BEB8EB",
  "adjust": "#AFA2FF",
  "helpers": "#75C9C8",
  "web_analytics": "#F6BDD1",
  "mobile_analytics": "#FFD791"
};

export default schemaColors;
