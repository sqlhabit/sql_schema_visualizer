import { useCallback } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Controls
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
          handleType: "source"
        },
        {
          name: "email",
        },
        {
          name: "name"
        }
      ]
    },
    position: { x: 600, y: 200 },
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
    position: { x: 800, y: 200 },
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
    position: { x: 1000, y: 200 },
    type: 'table',
  },
];

const initialEdges: Edge[] = [
  { id: 'users-purchases', source: 'users', target: 'purchases', sourceHandle: 'id', targetHandle: 'user_id', animated: false, type: "smoothstep" },
  { id: 'products-purchases', source: 'products', target: 'purchases', sourceHandle: 'id', targetHandle: 'product_id', animated: false, type: "smoothstep" },
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
      </ReactFlow>
    </div>
  );
}

export default Flow;
