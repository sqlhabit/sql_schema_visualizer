![SQL Schema Visualizer snapshot](https://raw.githubusercontent.com/sqlhabit/sql_schema_visualizer/main/docs/snapshot.png)

# SQL Schema Visualizer

A relational database schema visualizer built with React and ReactFlow.

## Features

:dash: **Easy to start**: you can import your schema in 1.5 minutes.
:checkered_flag: **Easy to finish**: you only need to configure edges and table positions.
:wrench: **Customizable**: add table/column descriptions and schema colors.
:rocket: **Make it yours**: you get the whole React app, so you can change everything.

## How to add your own schema

### Step 1. Clone and set up the repo

Schema Visualizer is a React app, here's how to install dependencies:

```bash
git clone https://github.com/sqlhabit/sql_schema_visualizer.git

cd sql_schema_visualizer

npm run install

npm run start

open http://localhost:9292
```

You might need to install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) as well to make sure you're not using an old Node version.

### Step 2. Reset schema configuration

At this point you should see SQL Habit's schema in your browser. Now let's reset all schema config files:

```bash
npm run reset
```

After running, you should see an empty grid in your browser.

### Step 3. Export your schema to a CSV file

Run a query in your database and save the output to the `schema.csv` file.

Copy this file to the root folder of the Schema Visualizer repo.

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
```

### Step 4. Import schema

```bash
npm run import
```

Now you should see tables scattered in your browser.

### Step 5. Configure your schema.

#### A. Set primary keys.

If a column is a primary key, add the `key` param to a column definition. Here's an example from [the `users` table](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/tables/users.json):

```json
{
  "name": "id",
  "handleType": "source",
  "key": true,
  "description": "Unique identifier of a user.",
  "type": "number"
}
```

:bulb: To enable outgoing edges, also add the `"handleType": "source"` param.

#### B. Set foreign keys.

If a column is a foreign key, set the `"handleType": "target"` param. It'll enable incoming edges. Here's an example from [the `purchases` table](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/tables/purchases.json):

```json
{
  "name": "user_id",
  "description": "id of a user who made the purchase.",
  "handleType": "target",
  "type": "integer"
}
```

#### C. Add edges.

#### D. Add schema colors.

#### E. Add table positions.

#### F. Add table and column descriptions.

### Resetting config files

To visualize your schema, first you need to clone the repo and reset all config files:

```sh
git clone https://github.com/sqlhabit/sql_schema_visualizer.git

cd sql_schema_visualizer

npm run reset
```

### How to arrange tables for your schema

By default, every table will be places in the center of the screen (`x: 0, y: 0` posision). All custom positions are stored in the [`src/config/tablePositions.json`](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/tablePositions.json) file.

There's no need to update them manually. Instead:

1. Drag table nodes around in the browser to find a perfect arrangement.
2. **CTRL** + **P**. It copies node positions JSON to your clipboard.
3. Paste (**CMD** + **V**) JSON with positions to the [`src/config/tablePositions.json`](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/tablePositions.json) file.
4. PROFIT :beers:

## Contributing

You're more than welcome to contribute. In fact, I'm really looking forward to it! :rocket:

Just make sure to check out the [contribution guidelines](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/CONTRIBUTING.md). :pray:

## How it was built

Schema Visualizer is built with [ReactFlow](https://reactflow.dev/).

Every table is a ReactFlow [Custom Node](https://reactflow.dev/docs/guides/custom-nodes/) with custom [Markers](https://reactflow.dev/docs/examples/edges/markers/) (those SVG icons with dot and fork).

[Here's a ReactFlow sandbox example of Custom Nodes](https://github.com/wbkd/react-flow-example-apps/tree/main/reactflow-create-react-app).

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

## Releasing

### Building your Schema Visualizer

Once you've added your tables, build the project and upload the files from the [`/build`](https://github.com/sqlhabit/sql_schema_visualizer/tree/main/build) to your hosting of choice:


```sh
npm build
```

### Deploying

I highly recommend https://surge.sh/. It'll take you ~2 minutes to deploy your schema online:

1. `npm install --global surge`.
2. `cd build`
3. `surge`
4. PROFIT :beers:

## Maintainers

Schema Visualizer is a project of Anatoli of [SQL Habit](https://www.sqlhabit.com/). Hi from Berlin! :wave: :beers:

Anatoli Makarevich • [Twitter](https://twitter.com/makaroni4) • [Github](https://github.com/makaroni4)


## License

SQL Schema Visualizer is [MIT licensed](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/LICENSE).
