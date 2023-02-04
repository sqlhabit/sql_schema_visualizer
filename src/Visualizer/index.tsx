import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node, useNodesState, useEdgesState, Edge,
  Controls, ControlButton, Background, useStoreApi, ReactFlowProvider,
  getConnectedEdges, OnSelectionChangeParams, NodeChange, getIncomers,
  getOutgoers, useNodes, useReactFlow
} from "reactflow";

import { nodeTypes } from "../config/nodeTypes";

import {
  MaximizeIcon,
  MinimizeIcon,
  InfoIcon,
  InfoPopup,
  Markers,
  UnknownDatasetPopup
} from "./components";

import {
  edgeClassName,
  edgeMarkerName,
  calculateTargetPosition,
  calculateSourcePosition,
  initializeNodes,
  moveSVGInFront,
  setHighlightEdgeClassName,
  logTablePositions,
  setEdgeClassName,
  loadDatabases
} from "./helpers";

import {
  EdgeConfig,
  Database
} from "./types";

// this is important! You need to import the styles from the lib to make it work
import "reactflow/dist/style.css";
import "./Style";

interface FlowProps {
  database?: string;
}

interface CalculateEdgesOptions {
  nodes: Node[];
  currentDatabase: Database;
}

const calculateEdges = ({ nodes, currentDatabase }: CalculateEdgesOptions) => {
  const initialEdges: Edge[] = [];

  currentDatabase.edgeConfigs.forEach((edgeConfig: EdgeConfig) => {
    const sourceNode = nodes.find((node: Node) => node.id === edgeConfig.source);
    const targetNode = nodes.find((node: Node) => node.id === edgeConfig.target);

    if(sourceNode && targetNode) {
      const sourcePosition = edgeConfig.sourcePosition || calculateSourcePosition(sourceNode.width as number, sourceNode!.position.x, targetNode.width as number, targetNode!.position.x);
      const targetPosition = edgeConfig.targetPosition || calculateTargetPosition(sourceNode.width as number, sourceNode!.position.x, targetNode.width as number, targetNode!.position.x);

      const sourceHandle = `${edgeConfig.sourceKey}-${sourcePosition}`;
      const targetHandle = `${edgeConfig.targetKey}-${targetPosition}`;

      initialEdges.push({
        id: `${edgeConfig.source}-${edgeConfig.target}`,
        source: edgeConfig.source,
        target: edgeConfig.target,
        sourceHandle,
        targetHandle,
        type: "smoothstep",
        markerEnd: edgeMarkerName(edgeConfig, targetPosition),
        className: edgeClassName(edgeConfig, targetPosition)
      });
    }
  });

  return initialEdges;
};

const Flow: React.FC<FlowProps> = (props: FlowProps) => {
  const reactFlowInstance = useReactFlow();
  const store = useStoreApi();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [fullscreenOn, setFullScreen] = useState(false);
  const [infoPopupOn, setInfoPopupOn] = useState(false);
  const [unknownDatasetOn, setUnknownDatasetOn] = useState(false);
  const [nodeHoverActive, setNodeHoverActive] = useState(true);
  const [currentDatabase, setCurrentDatabase] = useState({
    tables: [],
    edgeConfigs: [],
    schemaColors: {},
    tablePositions: {}
  } as Database);

  console.log("--> yo");

  const onInit = (instance: any) => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        const nodes = instance.getNodes();

        logTablePositions(nodes);
      }
    }

    document.addEventListener("keydown", handleKeyboard)

    // https://javascriptf1.com/snippet/detect-fullscreen-mode-with-javascript
    window.addEventListener("resize", (event) => {
      setFullScreen(window.innerHeight === window.screen.height);
    });
  };

  useEffect(() => {
    setUnknownDatasetOn(false);
    console.log("--> useEffect 1")

    loadDatabases().then((data) => {
      if(!props.database || !(props.database in data)) {
        setUnknownDatasetOn(true);
        return;
      }

      const databaseConfig = data[props.database] as Database;

      setCurrentDatabase(() => databaseConfig);
      setEdges(() => []);
      setNodes(() => []);
    });
  }, [props.database]);

  useEffect(() => {
    console.log("--> useEffect 2")
    const initialNodes = initializeNodes(currentDatabase);

    setNodes(() => initialNodes);
  }, [currentDatabase]);

  useEffect(() => {
    console.log("--> useEffect 3")
    console.log("--> useEffect nodes");
    console.log(nodes);

    reactFlowInstance.fitView();

    const initialEdges = calculateEdges({ nodes, currentDatabase });
    setEdges(() => initialEdges);
  }, [nodes]);

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
      setEdges(eds => {
        return eds.map((ed) => {
          if (connectedEdges.find(e => e.id === ed.id)) {
            setHighlightEdgeClassName(ed);
          }

          return ed;
        });
      });
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

      setEdges(eds =>
        eds.map(ed => setEdgeClassName(ed))
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
        moveSVGInFront(svg)
      })
    },
    []
  );

  const handleNodesChange = useCallback(
    (nodeChanges: NodeChange[]) => {
      nodeChanges.forEach(nodeChange => {
        if(nodeChange.type === "position" && nodeChange.positionAbsolute) { // nodeChange.positionAbsolute contains new position
          const node = nodes.find(node => node.id === nodeChange.id);

          if(!node) {
            return;
          }

          const incomingNodes = getIncomers(node, nodes, edges);
          incomingNodes.forEach(incomingNode => {
            const edge = edges.find(edge => {
              return edge.id === `${incomingNode.id}-${node.id}`;
            });

            const edgeConfig = currentDatabase.edgeConfigs.find((edgeConfig: EdgeConfig) => {
              return edgeConfig.source === incomingNode.id && edgeConfig.target === node.id;
            });

            if(nodeChange.positionAbsolute?.x) {
              setEdges(eds =>
                eds.map(ed => {
                  if(edge && ed.id === edge.id) {
                    const sourcePosition = edgeConfig!.sourcePosition || calculateSourcePosition((incomingNode.width as number), incomingNode.position.x, (node.width as number), nodeChange.positionAbsolute!.x);
                    const targetPosition = edgeConfig!.targetPosition || calculateTargetPosition((incomingNode.width as number), incomingNode.position.x, (node.width as number), nodeChange.positionAbsolute!.x);

                    const sourceHandle = `${edgeConfig!.sourceKey}-${sourcePosition}`;
                    const targetHandle = `${edgeConfig!.targetKey}-${targetPosition}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
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

            const edgeConfig = currentDatabase.edgeConfigs.find((edgeConfig: EdgeConfig) => {
              return edgeConfig.source === nodeChange.id && edgeConfig.target === targetNode.id;
            });

            if(nodeChange.positionAbsolute?.x) {
              setEdges(eds =>
                eds.map(ed => {
                  if(edge && ed.id === edge.id) {
                    const sourcePosition = edgeConfig!.sourcePosition || calculateSourcePosition((node.width as number), nodeChange.positionAbsolute!.x, (targetNode.width as number), targetNode.position.x);
                    const targetPosition = edgeConfig!.targetPosition || calculateTargetPosition((node.width as number), nodeChange.positionAbsolute!.x, (targetNode.width as number), targetNode.position.x);

                    const sourceHandle = `${edgeConfig!.sourceKey}-${sourcePosition}`;
                    const targetHandle = `${edgeConfig!.targetKey}-${targetPosition}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
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
    [onNodesChange, setEdges, nodes, edges, currentDatabase]
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

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.code === "Escape") {
      setInfoPopupOn(false);
    }
  });

  // https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
  document.addEventListener("click", (event: Event) => {
    const target = (event.target as HTMLInputElement);

    if (target && target.closest(".into-popup-toggle")) {
      return;
    }

    if (target && !target.closest(".info-popup__inner")) {
      setInfoPopupOn(false);
    }
  })

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      setNodeHoverActive(false);
    }
  }, false);

  document.addEventListener("keyup", (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      setNodeHoverActive(true);
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
          <ControlButton onClick={() => { setInfoPopupOn(!infoPopupOn) }} className="into-popup-toggle">
            <InfoIcon />
          </ControlButton>
        </Controls>
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      {infoPopupOn && <InfoPopup onClose={() => { setInfoPopupOn(false) }} />}
      {unknownDatasetOn && <UnknownDatasetPopup onClose={() => { setUnknownDatasetOn(false) }} />}
    </div>
  );
}

// https://codesandbox.io/s/elastic-elion-dbqwty?file=/src/App.js
// eslint-disable-next-line import/no-anonymous-default-export
const Visualizer: React.FC<FlowProps> = (props: FlowProps) => {
  return (
    <ReactFlowProvider>
      <Flow database={props.database} />
    </ReactFlowProvider>
  )
};

export default Visualizer;
