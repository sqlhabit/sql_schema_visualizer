# SQL Schema Graph

A prototype of relational database schema visualization using [ReactFlow](https://reactflow.dev/).

## How it works?

Every table is a ReactFlow' [Custom Node](https://reactflow.dev/docs/guides/custom-nodes/) with custom [Markers](https://reactflow.dev/docs/examples/edges/markers/) (those SVG icons with dot and fork). [Here's a ReactFlow sandbox example of Custom Nodes](https://github.com/wbkd/react-flow-example-apps/tree/main/reactflow-create-react-app).

## How to update table positions?

1. Drag them around to find a perfect arrangement.
2. CMD + P (it copy pastes positions JSON to your clipboard).
3. Paste the JSON to the `Flow/positions.ts` file.

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

## TODO


- [ ] Write README with screenshots and GIFs.
- [ ] Refactor.
- [ ] Pull in all tables and their columns from Bindle dataset.
- [ ] Final font styles.
- [ ] Final colors for highlighted edges.
- [ ] Final colors for selected edges.
- [ ] Final style for table and column descriptions.
- [ ] Add Github Action to deploy to Github pages https://create-react-app.dev/docs/deployment/#github-pages
- [ ] Add info popup content.
- [ ] Colors for coding different schemas.
- [x] CMD + Hover to show table and column descriptions.
- [x] Disable node hover if CMD key is pressed (edge selection).
- [x] Click on table name shows table description.
- [x] Simple edge definition that's translated later into ReactFlow syntax.
- [x] CMD + P prints positions JSON to copy paste (sort tables alphabetically).
- [x] Favicon.
- [x] package.json info.
- [x] Shoutout to ReactFlow demo app.
- [x] Fix full screen icon when full screen is entered via a shortcut.
