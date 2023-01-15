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

import usersTable from './Tables/users';
import marketingSpendsTable from "./Tables/marketing_spends";
import accountsTable from './Tables/accounts';
import booksUsersTable from './Tables/books_users';
import booksTable from './Tables/books';
import devicesTable from './Tables/devices';
import productsTable from './Tables/products';
import profilesTable from './Tables/profiles';
import purchasesTable from './Tables/purchases';
import Markers from './Markers';

const nodeTypes = {
  table: TableNode,
};

let initialNodes: Node[] = [];

initialNodes.push(usersTable);
initialNodes.push(marketingSpendsTable);
initialNodes.push(accountsTable);
initialNodes.push(booksUsersTable);
initialNodes.push(booksTable);
initialNodes.push(devicesTable);
initialNodes.push(productsTable);
initialNodes.push(profilesTable);
initialNodes.push(purchasesTable);

const positions = {
  users: { x: 280, y: -100 },
};

Object.entries(positions).forEach(params => {
  const tableName = params[0];
  const position = params[1];
  const tableNode = initialNodes.find(node => node.id === tableName);

  if(tableNode) {
    tableNode.position = position;
  }
});

const initialEdges: Edge[] = [
  { id: 'users-purchases', source: 'users', target: 'purchases', sourceHandle: 'id-r', targetHandle: 'user_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'products-purchases', source: 'products', target: 'purchases', sourceHandle: 'id-r', targetHandle: 'product_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'books_users-users', source: 'users', target: 'books_users', sourceHandle: 'id-l', targetHandle: 'user_id-r', animated: false, type: "smoothstep", markerEnd: "hasManyReversed", className: "has-many-edge-reversed" },
  { id: 'books_users-books', source: 'books', target: 'books_users', sourceHandle: 'id-r', targetHandle: 'book_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" },
  { id: 'users-profiles', source: 'users', target: 'profiles', sourceHandle: 'id-l', targetHandle: 'user_id-r', animated: false, type: "smoothstep", markerEnd: 'hasOneReversed', className: "has-one-edge-reversed" },
  { id: 'users-accounts', source: 'users', target: 'accounts', sourceHandle: 'id-r', targetHandle: 'user_id-l', animated: false, type: "smoothstep", markerEnd: 'hasOne', className: "has-one-edge" },
  { id: 'users-devices', source: 'users', target: 'devices', sourceHandle: 'id-r', targetHandle: 'user_id-l', animated: false, type: "smoothstep", markerEnd: 'hasMany', className: "has-many-edge" }
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
      <Markers />
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        snapToGrid={true}
        fitView
        snapGrid={[16, 16]}
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
