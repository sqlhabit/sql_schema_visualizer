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
    id: '4',
    data: { label: 'Node 4', name: "users" },
    position: { x: 600, y: 200 },
    type: 'table',
  },
  {
    id: '5',
    data: { label: 'Node 5', name: "purchases" },
    position: { x: 800, y: 200 },
    type: 'table',
  },
];

const initialEdges: Edge[] = [
  { id: 'users_id-purchases_id', source: '4', target: '5', sourceHandle: 'a', targetHandle: 'b', animated: true, type: "smoothstep" },
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
