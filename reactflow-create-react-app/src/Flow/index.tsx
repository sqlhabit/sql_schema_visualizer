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
  MarkerType
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
];

const initialEdges: Edge[] = [
  { id: 'users-purchases', source: 'users', target: 'purchases', sourceHandle: 'id', targetHandle: 'user_id', animated: false, type: "smoothstep", markerEnd: 'hasMany' },
  { id: 'products-purchases', source: 'products', target: 'purchases', sourceHandle: 'id', targetHandle: 'product_id', animated: false, type: "smoothstep", markerEnd: 'hasMany' }
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="Flow">
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            id="hasMany"
            viewBox="0 0 10 13"
            markerHeight={10}
            markerWidth={13}
            refX={10}
            refY={6.5}
            fill="none"
          >
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#B1B1B6"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#B1B1B6"/>
            <line x1="10" y1="6.5" x2="1" y2="6.5" stroke="#B1B1B6" strokeWidth="1" />
          </marker>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
