import { useCallback } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Controls,
  Background,
  getOutgoers,
  getIncomers
} from 'reactflow';

import TableNode from './TableNode';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';

const nodeTypes = {
  table: TableNode,
};

const initialNodes: Node[] = [
  {
    id: 'users',
    data: {
      label: 'Node 4',
      name: "users",
      columns: [
        {
          name: "id",
          handleType: "source",
          description: "Primary key of the users table. An integer. Use it to join with other tables."
        },
        {
          name: "email",
        },
        {
          name: "name"
        }
      ]
    },
    position: { x: 280, y: -100 },
    type: 'table',
  },
  {
    id: 'products',
    data: {
      label: 'Node 5',
      name: "products",
      columns: [
        {
          name: "id",
          handleType: "source"
        },
        {
          name: "name"
        },
        {
          name: "price"
        }
      ]
    },
    position: { x: 320, y: 160 },
    type: 'table',
  },
  {
    id: 'purchases',
    data: {
      label: 'Node 5',
      name: "purchases",
      columns: [
        {
          name: "id"
        },
        {
          name: "user_id",
          handleType: "target"
        },
        {
          name: "product_id",
          handleType: "target"
        },
      ]
    },
    position: { x: 600, y: 0 },
    type: 'table',
  },
  {
    id: 'books_users',
    data: {
      label: 'Node 5',
      name: "books_users",
      columns: [
        {
          name: "book_id",
          handleType: "target"
        },
        {
          name: "user_id",
          handleType: "target"
        },
      ]
    },
    position: { x: 100, y: 0 },
    type: 'table',
  },
  {
    id: 'books',
    data: {
      label: 'books',
      name: "books",
      columns: [
        {
          name: "id",
          handleType: "source"
        },
        {
          name: "name"
        },
        {
          name: "author"
        },
      ]
    },
    position: { x: -100, y: 100 },
    type: 'table',
  },
];

const initialEdges: Edge[] = [
  { id: 'users-purchases', source: 'users', target: 'purchases', sourceHandle: 'id-r', targetHandle: 'user_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'products-purchases', source: 'products', target: 'purchases', sourceHandle: 'id-r', targetHandle: 'product_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'books_users-users', source: 'users', target: 'books_users', sourceHandle: 'id-l', targetHandle: 'user_id-r', animated: false, type: "smoothstep", markerEnd: "hasManyReversed", className: "has-many-edge-reversed" },
  { id: 'books_users-books', source: 'books', target: 'books_users', sourceHandle: 'id-r', targetHandle: 'book_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" }
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const toggleEdgeHighlight = (node: Node, toggle: true | false) => {
    console.log(getOutgoers(node, nodes, edges));
    console.log(getIncomers(node, nodes, edges));
    console.log(node, toggle);

    // TODO: highlight all outgoing edges and their markers.
    // I guess via a CSS class toggle?
  }

  const onInit = (instance: any) => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        const nodes = instance.getNodes()

        nodes.forEach((n: any) => {
          console.log(`${n.data.name} x: ${Math.round(n.position.x)}, y: ${Math.round(n.position.y)}`)
        })
      }
    }

    document.addEventListener('keydown', handleKeyboard)
  }

  // https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css
  return (
    <div className="Flow">
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            id="hasMany"
            viewBox="0 0 10 13"
            markerHeight="10"
            markerWidth="13"
            refX="10"
            refY="6.5"
            fill="none"
          >
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#B1B1B6"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#B1B1B6"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            id="hasManySelected"
            viewBox="0 0 10 13"
            markerHeight="10"
            markerWidth="13"
            refX="10"
            refY="6.5"
            fill="none"
          >
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#555"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#555"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            id="hasManyReversed"
            viewBox="0 0 10 13"
            markerHeight="10"
            markerWidth="13"
            refX="10"
            refY="6.5"
            fill="none"
            orient="auto-start-reverse"
          >
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#B1B1B6"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#B1B1B6"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            id="hasManyReversedSelected"
            viewBox="0 0 10 13"
            markerHeight="10"
            markerWidth="13"
            refX="10"
            refY="6.5"
            fill="none"
            orient="auto-start-reverse"
          >
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#555"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#555"/>
          </marker>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        nodeTypes={nodeTypes}
        onNodeMouseEnter={(_event, node) => toggleEdgeHighlight(node, true)}
        onNodeMouseLeave={(_event, node) => toggleEdgeHighlight(node, false)}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
