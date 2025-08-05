import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from 'react-flow-renderer';
import { useStore } from 'zustand';
import CustomNode from './CustomNode';


export default function FlowCanvas() {

//   const storeNodes=useStore((s)=>s.nodes);
//   const storeEdges=useStore((s)=>s.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = {
    Account: CustomNode,
    Loan: CustomNode,
    Collateral: CustomNode,
  };

  return (
    <div className="h-screen w-3/4 border border-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background/>
        <Controls />
      </ReactFlow>
    </div>
  );
}
