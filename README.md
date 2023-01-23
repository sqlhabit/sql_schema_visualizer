# SQL Schema Visualizer

A prototype of relational database schema visualization using [ReactFlow](https://reactflow.dev/).

## How it works?

Every table is a ReactFlow' [Custom Node](https://reactflow.dev/docs/guides/custom-nodes/) with custom [Markers](https://reactflow.dev/docs/examples/edges/markers/) (those SVG icons with dot and fork). [Here's a ReactFlow sandbox example of Custom Nodes](https://github.com/wbkd/react-flow-example-apps/tree/main/reactflow-create-react-app).

## How to update table positions?

1. Drag them around to find a perfect arrangement.
2. CMD + P (it copy pastes positions JSON to your clipboard).
3. Paste the JSON to the [`Flow/TablePositions.ts`](https://github.com/sqlhabit/sql_schema_visualizer/blob/main/src/Flow/TablePositions.ts) file.

## Installation

```sh
npm install
```

### Start Dev Server

```sh
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run Tests

```sh
npm test
```

### Build

```sh
npm run build
```
