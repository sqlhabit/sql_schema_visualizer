![SQL Schema Visualizer snapshot](https://raw.githubusercontent.com/sqlhabit/sql_schema_visualizer/main/docs/snapshot.png)

<div align="center">

# SQL Schema Visualizer

![GitHub License MIT](https://img.shields.io/github/license/sqlhabit/sql_schema_visualizer?color=%23BEB8EB)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/sqlhabit/sql_schema_visualizer?color=%23BEB8EB)

A relational database schema visualizer built with React and [ReactFlow](https://github.com/wbkd/react-flow).

Originally built for [the SQL Habit course](https://www.sqlhabit.com/), it's available for everyone. Enjoy :heart:

[:mag: How to visualize your schema](https://github.com/sqlhabit/sql_schema_visualizer#how-to-visualize-your-schema) | [:microscope: How it works](https://github.com/sqlhabit/sql_schema_visualizer#under-the-hood) | [:handshake: Contributing](https://github.com/sqlhabit/sql_schema_visualizer#contributing)

</div>

## Features

:dash: **Easy to start**: you can import your schema(s) in 1.5 minutes.
<br>
:checkered_flag: **Easy to finish**: you only need to configure edges and table positions.
<br>
:wrench: **Customizable**: add table/column descriptions and schema colors.
<br>
:rocket: **Make it yours**: you get the whole React app, so you can change everything.

## How to visualize your schema(s)

Schema Visualizer can visualize multiple schemas – each schema will have its own URL.

A schema configuration lives in [its own folder](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/src/config/databases) and contains a bunch of [simple JSON files](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/src/config/databases/bindle).

Here's how you can import your schema:

### Step 1. Clone and set up the repo

Clone the repo:

```bash
git clone https://github.com/sqlhabit/sql_schema_visualizer.git

cd sql_schema_visualizer
```

Install dependencies:

```bash
npm run install
```

:bulb: You might need to install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) as well to make sure you're not using an old Node version.

### Step 2. Reset schema configuration

By default, Schema Visualizer contains [SQL Habit's](https://www.sqlhabit.com) dataset schemas. Let's delete all before we import new schemas:

```bash
npm run reset
```

### Step 3. Export your schema into a CSV file

A schema config consists of [tables](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/src/config/databases/bindle/tables), [edges](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/edges.json), [table positions](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/tablePositions.json) and [schema colors](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/schemaColors.json).

Good news is that we can import tables using an SQL query. :rocket:

Pick a query for your database type and save the output to a CSV file like `my_schema.csv`. Put it to the root folder (next to [the `schema.csv.template` file](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/schema.csv.template)).

#### Postgres / Redshift

```sql
SELECT
  t.table_schema,
  t.table_name,
  c.column_name,
  c.data_type,
  c.ordinal_position
FROM information_schema.tables t
LEFT JOIN information_schema.columns c
  ON t.table_schema = c.table_schema
    AND t.table_name = c.table_name
WHERE
  t.table_schema NOT IN ('information_schema', 'pg_catalog')
  AND t.table_name NOT IN ('schema_migrations', 'ar_internal_metadata')
ORDER BY 1, 2, 5
```

#### MySQL

```sql
SELECT
  c.table_schema,
  c.table_name,
  c.column_name,
  c.data_type,
  c.ordinal_position
FROM information_schema.columns c
LEFT JOIN information_schema.views v
  ON v.table_schema = c.table_schema
    AND v.table_name = c.table_name
WHERE
  c.table_schema NOT IN ('sys','information_schema', 'mysql', 'performance_schema')
  AND c.table_name NOT IN ('schema_migrations', 'ar_internal_metadata')
```

### Step 4. Import schema

Now we can import tables. The argument of the `npm run import` command is your CSV file name:


```bash
npm run import my_schema
```

You should see table JSON files added to the `src/config/databases/my_schema/tables` folder.

Let's spin up a dev server and see our tables [in the browser](http://localhost:3000/):

```bash
npm run start
```

### Step 5. Configure your schema

#### A. Set primary keys

To show a :key: icon next to the column name, add the `key` param to a column definition. Here's an example from [the `users` table](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/tables/users.json):

```json
{
  "name": "id",
  "key": true,
  "description": "Unique identifier of a user.",
  "type": "number"
}
```

#### B. Add edges

Define edges in [the `src/config/edges.json` file](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/edges.json):

Here's an example for **has one** relation:

```json
{
  "source": "users",
  "sourceKey": "id",
  "target": "profiles",
  "targetKey": "user_id",
  "relation": "hasOne"
}
```

and **has many** relation:

```json
{
  "source": "users",
  "sourceKey": "id",
  "target": "purchases",
  "targetKey": "user_id",
  "relation": "hasMany"
}
```

#### C. Add schema colors

You can set custom header colors for tables that belongs to the same schema in [the `schemaColors.json` file](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/schemaColors.json). Here's an example:

```json
{
  "DEFAULT": "#91C4F2",
  "public": "#BEB8EB",
  "adjust": "#AFA2FF",
  "helpers": "#75C9C8",
  "web_analytics": "#F6BDD1",
  "mobile_analytics": "#FFD791"
}
```

#### D. Add table positions

Table positions are defined in the [`tablePositions.json` file](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/tablePositions.json):

```json
{
"adjust.callbacks": {
  "x": 864,
  "y": -192
},
"helpers.dates": {
  "x": 512,
  "y": 528
},
"mobile_analytics.events": {
  "x": 656,
  "y": -336
}
```

After you import a schema, every table will have a default position set in the [`tablePositions.json`](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/tablePositions.json) file.

There's no need to update them manually. Instead:

1. Open Schema Visualizer [http://localhost:3000](http://localhost:3000).
2. Drag table nodes around to find a perfect arrangement.
3. **CTRL** + **P**. It copies node positions JSON to your clipboard.
4. Paste (**CMD** + **V**) JSON with positions to the [`tablePositions.json`](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/tablePositions.json) file of your schema.
5. PROFIT :beers:

#### E. Add table and column descriptions

Table and column descriptions are visible if you press `CMD` key and hover over a table or column name.

Add custom copy to the `"description"` keys [in table config files](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/src/config/databases/bindle/tables/users.json). Here's an example:

```json
{
  "name": "users",
  "description": "This table contains all user records of Bindle.",
  "columns": [
    {
      "name": "id",
      "key": true,
      "description": "Unique identifier of a user.",
      "type": "number"
    }
  ]
}
```

### Publish your schema online

#### Building your Schema Visualizer

Once you're finished with config file, build the project and upload the files from the [`/build`](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/build) folder to your hosting of choice:


```sh
npm build
```

I highly recommend https://surge.sh/. It'll take you ~2 minutes to deploy your schema online:

1. `npm install --global surge`.
2. `cd build`
3. `surge`
4. PROFIT :beers:

## Contributing

You're more than welcome to contribute. In fact, I'm really looking forward to it! :rocket:

Just make sure to check out the [contribution guidelines](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/CONTRIBUTING.md). :pray:

## Under the hood

Schema Visualizer is built with [ReactFlow](https://reactflow.dev/).

Every table is a ReactFlow [Custom Node](https://reactflow.dev/docs/guides/custom-nodes/) with custom [Markers](https://reactflow.dev/docs/examples/edges/markers/) (those SVG icons with dot and fork).

Here's [a ReactFlow sandbox example](https://github.com/wbkd/react-flow-example-apps/tree/main/reactflow-create-react-app) of Custom Nodes.

### Config files

It all starts with plain [JSON config files](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/src/config). There're 4 of them:

* [tables](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/src/config/databases/bindle/tables)
* [edges](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/edges.json)
* [tablePositions](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/tablePositions.json)
* [schemaColors](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/databases/bindle/schemaColors.json)

Later they're translated into Nodes and Edges digestible by ReactFlow.

### Nodes and Handles

ReactFlow draws SVG edges between custom [Table Nodes](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/Visualizer/components/TableNode.tsx#L64).

Those edges start and end in ReactFlow Handle's. Every table column row has 2 handles – left and right. :bulb: A handle could be either **source** (for an outgoing edge) or a **target** (for an incoming edge). Handles are configured [based on the edges config](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/Visualizer/helpers/initializeNodes.ts#L4).

### Edges

As you can see, edges are dynamically change handles and orientation depending on relative node positions. That way it's less config to maintain, here're [helper](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/Visualizer/helpers/calculateTargetPosition.ts) [functions](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/Visualizer/helpers/calculateSourcePosition.ts) that take care of that.

### More details

[Here's the entry file](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/Visualizer/index.tsx) to the ReactFlow app.

Have fun exploring the app, it was a pleasure to build! If you have a question – open a [new issue](https://github.com/sqlhabit/sql_schema_visualizer/issues/new/choose). :beers:

## Development

You'll need to install dependencies and start a dev server:

```sh
npm install

npm start
```

You'll find the running visualizer at [http://localhost:3000](http://localhost:3000).

## Testing

Tests are written with the [React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro). Run all of them via


```sh
npm test
```

## Maintainers

Schema Visualizer is a project of Anatoli of [SQL Habit](https://www.sqlhabit.com/). Hi from Berlin! :wave: :beers:

Anatoli Makarevich • [Twitter](https://twitter.com/makaroni4) • [Github](https://github.com/makaroni4)


## License

SQL Schema Visualizer is [MIT licensed](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/LICENSE).
