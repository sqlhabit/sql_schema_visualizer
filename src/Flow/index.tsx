import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Controls,
  ControlButton,
  Background,
  getOutgoers,
  getIncomers,
  useStoreApi,
  ReactFlowProvider,
  getConnectedEdges,
  OnSelectionChangeParams
} from 'reactflow';

import TableNode from './TableNode';
import MaximizeIcon from './MaximizeIcon';
import MinimizeIcon from './MinimizeIcon';
import InfoIcon from './InfoIcon';
import InfoPopup from './InfoPopup';

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
          description: "Primary key of the users table. An integer. Use it to join with other tables.",
          type: "number"
        },
        {
          name: "email",
          type: "string"
        },
        {
          name: "name",
          type: "string"
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
          handleType: "source",
          type: "number"
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "price",
          type: "number"
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
          name: "id",
          type: "number"
        },
        {
          name: "user_id",
          handleType: "target",
          type: "number"
        },
        {
          name: "product_id",
          handleType: "target",
          type: "number"
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
          handleType: "target",
          type: "number"
        },
        {
          name: "user_id",
          handleType: "target",
          type: "number"
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
          handleType: "source",
          type: "number"
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "author",
          type: "string"
        },
      ]
    },
    position: { x: -100, y: 100 },
    type: 'table',
  },
  {
    id: 'profiles',
    data: {
      label: 'profiles',
      name: "profiles",
      columns: [
        {
          name: "id",
          handleType: "source",
          type: "number"
        },
        {
          name: "user_id",
          handleType: "target",
          type: "number"
        },
        {
          name: "about",
          type: "string"
        },
      ]
    },
    position: { x: -100, y: -150 },
    type: 'table'
  },
  {
    id: 'accounts',
    data: {
      label: 'accounts',
      name: "accounts",
      columns: [
        {
          name: "id",
          handleType: "source",
          type: "number"
        },
        {
          name: "user_id",
          handleType: "target",
          type: "number"
        },
        {
          name: "platform",
          type: "string"
        },
      ]
    },
    position: { x: 450, y: -250 },
    type: 'table'
  }
];

const initialEdges: Edge[] = [
  { id: 'users-purchases', source: 'users', target: 'purchases', sourceHandle: 'id-r', targetHandle: 'user_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'products-purchases', source: 'products', target: 'purchases', sourceHandle: 'id-r', targetHandle: 'product_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'books_users-users', source: 'users', target: 'books_users', sourceHandle: 'id-l', targetHandle: 'user_id-r', animated: false, type: "smoothstep", markerEnd: "hasManyReversed", className: "has-many-edge-reversed" },
  { id: 'books_users-books', source: 'books', target: 'books_users', sourceHandle: 'id-r', targetHandle: 'book_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'users-profiles', source: 'users', target: 'profiles', sourceHandle: 'id-l', targetHandle: 'user_id-r', animated: false, type: "smoothstep", markerEnd: 'hasOneReversed', className: "has-one-edge-reversed" },
  { id: 'users-accounts', source: 'users', target: 'accounts', sourceHandle: 'id-r', targetHandle: 'user_id-l', animated: false, type: "smoothstep", markerEnd: 'hasOne', className: "has-one-edge" }
];

function Flow() {
  const store = useStoreApi();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const [fullscreenOn, setFullScreen] = useState(false);
  const [infoPopupOn, setInfoPopupOn] = useState(false);

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

  function moveInFront(element: any) {
    const svg = element.closest('svg'); // Find the parent SVG
    svg.appendChild(element); // Append child moves the element to the end
  }

  // https://github.com/wbkd/react-flow/issues/2580
  const onNodeMouseEnter = useCallback(
    (_: any, node: Node) => {
      const state = store.getState();
      state.resetSelectedElements();
      state.addSelectedNodes([node.id]);

      const outgoers = getOutgoers(node, nodes, edges)
      console.log(outgoers);

      const connectedEdges = getConnectedEdges([node], edges);
      console.log(connectedEdges)
      connectedEdges.map(edge => {
        console.log("edge");
        console.log(edge);

        // https://reactflow.dev/docs/examples/nodes/update-node/
        setEdges((eds) =>
          eds.map((ed) => {
            if (ed.id === edge.id) {
              if(edge.className?.includes("has-many-edge-reversed")) {
                ed.className = "has-many-edge-reversed has-many-edge-reversed--highlighted";
                ed.markerEnd = "hasManyReversedHighlighted"

                // https://stackoverflow.com/questions/17786618/how-to-use-z-index-in-svg-elements
                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              } else if(edge.className?.includes("has-many-edge")) {
                ed.className = "has-many-edge has-many-edge--highlighted";
                ed.markerEnd = "hasManyHighlighted"

                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              } else if(edge.className?.includes("has-one-edge-reversed")) {
                ed.className = "has-one-edge-reversed has-one-edge-reversed--highlighted";
                ed.markerEnd = "hasOneReversedHighlighted"

                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              } else if(edge.className?.includes("has-one-edge")) {
                ed.className = "has-one-edge has-one-edge--highlighted";
                ed.markerEnd = "hasOneHighlighted"

                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              }
            }

            return ed;
          })
        );

        return edge
      })

      console.log(getIncomers(node, nodes, edges));
      console.log(node);
    },
    [setEdges, store]
  );

  const onNodeMouseLeave = useCallback(
    (_: any, node: Node) => {
      const state = store.getState();
      state.resetSelectedElements();

      setEdges((eds) =>
        eds.map((ed) => {
          if(ed.className?.includes("has-many-edge-reversed")) {
            ed.className = "has-many-edge-reversed";
            ed.markerEnd = "hasManyReversed"
          } else if(ed.className?.includes("has-many-edge")) {
            ed.className = "has-many-edge";
            ed.markerEnd = "hasMany"
          } else if(ed.className?.includes("has-one-edge-reversed")) {
            ed.className = "has-one-edge-reversed";
            ed.markerEnd = "hasOneReversed"
          } else if(ed.className?.includes("has-one-edge")) {
            ed.className = "has-one-edge";
            ed.markerEnd = "hasOne"
          }

          return ed;
        })
      );

      // https://stackoverflow.com/questions/2520650/how-do-you-clear-the-focus-in-javascript
      (document.activeElement as HTMLElement).blur();
    },
    [setEdges, store]
  );

  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      const edges = params.edges;

      edges.forEach(ed => {
        const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
        moveInFront(svg)
      })
    },
    [setEdges, store]
  );

  const toggleFullScreen = () => {
    if(fullscreenOn) {
      document.exitFullscreen().then(function() {
        setFullScreen(false)
      })
      .catch(function(error) {
        alert("Can't exit fullscreen")
        console.error(error)
      });
    } else {
      var element = document.querySelector("body");

      // make the element go to full-screen mode
      element && element.requestFullscreen()
        .then(function() {
          setFullScreen(true)
        })
        .catch(function(error) {
          alert("Can't turn on fullscreen")
          console.error(error)
        });
    }
  }

  const toggleInfoPopup = () => {
    setInfoPopupOn(!infoPopupOn)
  }

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.code === 'Escape'){
      setInfoPopupOn(false);
    }
  });

  // https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
  document.addEventListener('click', (event: Event) => {
    const target = (event.target as HTMLInputElement);

    if (target && target.closest('.into-popup-toggle')) {
      return;
    }

    if (target && !target.closest('.info-popup')) {
      setInfoPopupOn(false);
    }
  })

  // https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css
  return (
    <div className="Flow">
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasMany" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none">
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#B1B1B6"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#B1B1B6"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasManySelected" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none">
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#555"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#555"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasManyReversed" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none" orient="auto-start-reverse">
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#B1B1B6"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#B1B1B6"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasManyReversedSelected" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none" orient="auto-start-reverse">
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#555"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#555"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasManyHighlighted" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none">
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="blue"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="blue"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasManyReversedHighlighted" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none" orient="auto-start-reverse">
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="blue"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="blue"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasOne" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none">
            <circle cx="3" cy="3" r="3" fill="#B1B1B6"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasOneSelected" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none">
            <circle cx="3" cy="3" r="3" fill="#555"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasOneReversed" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none" orient="auto-start-reverse">
            <circle cx="3" cy="3" r="3" fill="#B1B1B6"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasOneReversedSelected" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none" orient="auto-start-reverse">
            <circle cx="3" cy="3" r="3" fill="#555"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasOneHighlighted" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none">
            <circle cx="3" cy="3" r="3" fill="blue"/>
          </marker>
        </defs>
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker id="hasOneReversedHighlighted" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none" orient="auto-start-reverse">
            <circle cx="3" cy="3" r="3" fill="blue"/>
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
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onSelectionChange={onSelectionChange}
      >
        <Controls>
          <ControlButton onClick={toggleFullScreen}>
            {!fullscreenOn && <MaximizeIcon />}
            {fullscreenOn && <MinimizeIcon />}
          </ControlButton>
          <ControlButton onClick={toggleInfoPopup} className="into-popup-toggle">
            <InfoIcon />
          </ControlButton>
        </Controls>
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      {infoPopupOn && <InfoPopup />}
    </div>
  );
}

// https://codesandbox.io/s/elastic-elion-dbqwty?file=/src/App.js
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
