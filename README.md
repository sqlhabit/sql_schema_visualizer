# SQL Schema Visualizer

A prototype of relational database schema visualization using [ReactFlow](https://reactflow.dev/).

## How it works?

Every table is a ReactFlow' [Custom Node](https://reactflow.dev/docs/guides/custom-nodes/) with custom [Markers](https://reactflow.dev/docs/examples/edges/markers/) (those SVG icons with dot and fork). [Here's a ReactFlow sandbox example of Custom Nodes](https://github.com/wbkd/react-flow-example-apps/tree/main/reactflow-create-react-app).

## How to arrange tables for your schema

By default, every table will be places in the center of the screen (`x: 0, y: 0` posision). All custom positions are stored in the [`src/config/tablePositions.ts`](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/tablePositions.ts) file.

There's no need to update them manually. Instead:

1. Drag table nodes around in the browser to find a perfect arrangement.
2. **CTRL** + **P**. It copies node positions JSON to your clipboard.
3. Paste (**CMD** + **V**) JSON with positions to the [`src/config/tablePositions.ts`](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/config/tablePositions.ts) file.
4. PROFIT :beers:

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

## License

SQL Schema Visualizer is [MIT licensed](/blob/main/LICENSE).
