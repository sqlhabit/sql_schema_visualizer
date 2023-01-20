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
  useStoreApi,
  ReactFlowProvider,
  getConnectedEdges,
  OnSelectionChangeParams,
  NodeChange,
  getIncomers,
  getOutgoers
} from 'reactflow';

import TableNode from './TableNode';
import MaximizeIcon from './Icons/MaximizeIcon';
import MinimizeIcon from './Icons/MinimizeIcon';
import InfoIcon from './Icons/InfoIcon';
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
import adjustCallbacksTable from './Tables/adjust_callbacks';
import helpersDatesTable from './Tables/helpers_dates';
import webAnalyticsPageviewsTable from './Tables/web_analytics_pageviews';
import webAnalyticsEventsTable from './Tables/web_analytics_events';
import mobileAnalyticsEventsTable from './Tables/mobile_analytics_events';

import tablePositions from './TablePositions';

import Markers from './Markers';
import edgeParams from './Edges';

interface Position {
  x: number;
  y: number;
};

interface Positions {
  tableName: Position;
};

const fullTableName = (tableName: string, schemaName = "public") => {
  if(tableName.includes(".")) {
    return tableName;
  } else {
    return `${schemaName}.${tableName}`;
  }
};

const tablePositionsWithSchema = {} as Positions;

Object.entries(tablePositions).forEach(params => {
  const tableName = params[0];
  const position = params[1] as Position;

  if(tableName.includes(".")) {
    tablePositionsWithSchema[tableName as keyof Positions] = position;
  } else {
    tablePositionsWithSchema[fullTableName(tableName) as keyof Positions] = position;
  }
});

const nodeTypes = {
  table: TableNode,
};

let initialNodes: Node[] = [];

[
  usersTable,
  marketingSpendsTable,
  accountsTable,
  booksUsersTable,
  booksTable,
  devicesTable,
  productsTable,
  profilesTable,
  purchasesTable,
  adjustCallbacksTable,
  helpersDatesTable,
  webAnalyticsPageviewsTable,
  webAnalyticsEventsTable,
  mobileAnalyticsEventsTable
].forEach(tableData => {
  const schemaName = (tableData as any).schema || "public";
  const tableID = fullTableName(tableData.name, schemaName);

  const tableDefinition: Node = {
    id: tableID,
    data: tableData,
    position: (tablePositionsWithSchema as any)[tableID] || { x: 0, y: 0 },
    type: "table"
  }

  initialNodes.push(tableDefinition);
});

const initialEdges: Edge[] = [];

const edgeClassName = (edge: any) => {
  let className = edge.relation === "hasOne" ? "has-one-edge" : "has-many-edge";

  if(edge.targetPosition === "left") {
    className += "-reversed";
  }

  return className;
};

const edgeMarkerName = (edge: any) => {
  let markerName = edge.relation === "hasOne" ? "hasOne" : "hasMany";

  if(edge.targetPosition === "left") {
    markerName += "Reversed";
  }

  return markerName;
};

edgeParams.forEach(edge => {
  const sourceTableName = fullTableName(edge.source);
  const targetTableName = fullTableName(edge.target);

  edge.source = sourceTableName;
  edge.target = targetTableName;
})

const sourceHandleId = (
  sourceNodeWidth: number,
  sourceNodeX: number,
  targetNodeWidth: number,
  targetNodeX: number,
  edge: any
) => {
  if(sourceNodeX > (targetNodeX + targetNodeWidth)) {
    return `${edge.sourceKey}-l`;
  } else if ((sourceNodeX + sourceNodeWidth) < targetNodeX) {
    return `${edge.sourceKey}-r`;
  } else if (sourceNodeX > targetNodeX) {
    return `${edge.sourceKey}-r`;
  } else {
    return `${edge.sourceKey}-l`;
  }
};

const targetHandleId = (
  sourceNodeWidth: number,
  sourceNodeX: number,
  targetNodeWidth: number,
  targetNodeX: number,
  edge: any
) => {
  if(sourceNodeX > targetNodeX) {
    return `${edge.targetKey}-r`;
  } else {
    return `${edge.targetKey}-l`;
  }
};

edgeParams.forEach(edge => {
  let sourceHandle = edge.sourceKey;
  if(edge.sourcePosition) {
    sourceHandle += `-${edge.sourcePosition === "left" ? "l" : "r"}`;
  } else {
    sourceHandle += `-${edge.targetPosition === "left" ? "l" : "r"}`;
  }

  let targetHandle = `${edge.targetKey}-${edge.targetPosition === "left" ? "r" : "l"}`;

  initialEdges.push({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    sourceHandle,
    targetHandle,
    type: "smoothstep",
    markerEnd: edgeMarkerName(edge),
    className: edgeClassName(edge)
  })
});

function Flow() {
  const store = useStoreApi();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const [fullscreenOn, setFullScreen] = useState(false);
  const [infoPopupOn, setInfoPopupOn] = useState(false);
  let nodeHoverActive = true;

  const onInit = (instance: any) => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        const nodes = instance.getNodes();

        const positions = {} as Positions;

        const compare = ( a: String, b: String ) => {
          if ( a < b ){
            return -1;
          }
          if ( a > b ){
            return 1;
          }
          return 0;
        }

        nodes.sort((n1: Node, n2: Node) => compare(n1.id, n2.id)).forEach((n: Node) => {
          positions[n.id as keyof Positions] = {
            x: Math.round(n.position.x),
            y: Math.round(n.position.y)
          };
        });

        navigator.clipboard.writeText(JSON.stringify(positions, null, 2));
        console.log(JSON.stringify(positions, null, 2));
      }
    }

    document.addEventListener('keydown', handleKeyboard)

    // https://javascriptf1.com/snippet/detect-fullscreen-mode-with-javascript
    window.addEventListener('resize', (event) => {
      setFullScreen(window.innerHeight === window.screen.height);
    });
  }

  // An SVG z-index hack to move selected edge on top of other edges.
  function moveInFront(element: any) {
    if(!element) {
      return;
    }

    const svg = element.closest('svg');
    svg.appendChild(element);
  }

  // https://github.com/wbkd/react-flow/issues/2580
  const onNodeMouseEnter = useCallback(
    (_: any, node: Node) => {
      if(!nodeHoverActive) {
        return;
      }

      const state = store.getState();
      state.resetSelectedElements();
      state.addSelectedNodes([node.id]);

      const connectedEdges = getConnectedEdges([node], edges);
      connectedEdges.map(edge => {
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
    },
    [edges, nodeHoverActive, setEdges, store]
  );

  const onNodeMouseLeave = useCallback(
    (_: any, node: Node) => {
      if(!nodeHoverActive) {
        return;
      }

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
    [nodeHoverActive, setEdges, store]
  );

  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      const edges = params.edges;
      edges.forEach(ed => {
        const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
        moveInFront(svg)
      })
    },
    []
  );

  const handleNodesChange = useCallback(
    (nodeChanges: NodeChange[]) => {
      nodeChanges.forEach(nodeChange => {
        if(nodeChange.type === "position" && nodeChange.positionAbsolute) {
          const node = nodes.find(node => node.id === nodeChange.id);

          if(!node) {
            return;
          }

          console.log(nodeChange.positionAbsolute); // New position (!!)

          const incomingNodes = getIncomers(node, nodes, edges);
          incomingNodes.forEach(incomingNode => {
            const edge = edges.find(edge => {
              return edge.id === `${incomingNode.id}-${node.id}`;
            });

            const edgeParam = edgeParams.find(edgeParam => {
              return edgeParam.source === incomingNode.id && edgeParam.target === node.id;
            });

            if(nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if(edge && ed.id === edge.id) {
                    ed.sourceHandle = sourceHandleId((incomingNode.width as number), incomingNode.position.x, (node.width as number), nodeChange.positionAbsolute!.x, edgeParam);
                    ed.targetHandle = targetHandleId((incomingNode.width as number), incomingNode.position.x, (node.width as number), nodeChange.positionAbsolute!.x, edgeParam);
                  }

                  return ed;
                })
              )
            }
          });

          const outgoingNodes = getOutgoers(node, nodes, edges);
          outgoingNodes.forEach(targetNode => {
            const edge = edges.find(edge => {
              return edge.id === `${node.id}-${targetNode.id}`;
            });

            const edgeParam = edgeParams.find(edgeParam => {
              return edgeParam.source === nodeChange.id && edgeParam.target === targetNode.id;
            });

            if(nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if(edge && ed.id === edge.id) {
                    ed.sourceHandle = sourceHandleId((node.width as number), nodeChange.positionAbsolute!.x, (targetNode.width as number), targetNode.position.x, edgeParam);
                    ed.targetHandle = targetHandleId((node.width as number), nodeChange.positionAbsolute!.x, (targetNode.width as number), targetNode.position.x, edgeParam);
                  }

                  return ed;
                })
              )
            }
          });
        }
      });

      onNodesChange(nodeChanges);
    },
    [onNodesChange, setEdges, nodes, edges]
  )

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

    if (target && !target.closest('.info-popup__inner')) {
      setInfoPopupOn(false);
    }
  })

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      nodeHoverActive = false;
    }
  }, false);

  document.addEventListener('keyup', (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      nodeHoverActive = true;
    }
  }, false);

  // https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css
  return (
    <div className="Flow">
      <Markers />
      <ReactFlow
        nodes={nodes}
        onNodesChange={handleNodesChange}
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
      {infoPopupOn && <InfoPopup onClose={() => { setInfoPopupOn(false) }} />}
    </div>
  );
}

// https://codesandbox.io/s/elastic-elion-dbqwty?file=/src/App.js
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
