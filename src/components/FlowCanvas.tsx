import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdges,
  useEdgesState,
  useNodesState,
  type Node,
  ConnectionLineType,
  addEdge,
  type Connection,
} from "react-flow-renderer";
import CustomNode from "./CustomNode";
import SidePanel from "./SidePanel";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { LayoutDirection, TreeNode } from "../data/types";
import { useStore } from "../context/store";
import { getLayoutedElements } from "../flow/layout";

export default function FlowCanvas() {
  const storeNodes = useStore((s) => s.nodes);
  const storeEdges = useStore((s) => s.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const nodeTypes = useMemo(
    () => ({
      Account: CustomNode,
      Loan: CustomNode,
      Collateral: CustomNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  const onLayout = useCallback(
    (direction: LayoutDirection) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes] as Node[]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, storeEdges, storeNodes]
  );

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      storeNodes as Node[],
      storeEdges
    );

    setNodes(layoutedNodes as Node[]);
    setEdges(layoutedEdges);
  }, [storeNodes, storeEdges,edges]);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    const fullNode = storeNodes.find((n) => n.id === node.id) || null;
    setSelectedNode(fullNode);
    console.log("FullNode", fullNode);
  };

  return (
    <div className="flex">
      <div className="h-screen w-3/4">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          onPaneClick={() => setSelectedNode(null)}
          fitView
          snapToGrid={true}
        >
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => onLayout("TB")}
            >
              Vertical Layout
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => onLayout("LR")}
            >
              Horizontal Layout
            </button>
          </div>
          <MiniMap />
          <Background />
          <Controls />

          {nodes.length === 0 && (
            <div className="absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2 text-gray-500">
              No nodes yet!
              <br /> Click "Add Root Node" from the side panel to start building
              your tree.
            </div>
          )}
        </ReactFlow>
      </div>
      <div className="h-screen w-1/4">
        <SidePanel
          onClose={() => setSelectedNode(null)}
          selectedNode={selectedNode}
        />
      </div>
    </div>
  );
}
