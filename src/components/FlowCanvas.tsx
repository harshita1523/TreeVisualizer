import ReactFlow, { Background, Controls, useEdgesState, useNodesState, type Node } from 'react-flow-renderer';
import CustomNode from './CustomNode';
import SidePanel from './SidePanel';
import React, { useState } from 'react';
import type { TreeNode } from '../data/types';
import { useStore } from '../context/store';


export default function FlowCanvas() {

  const [selectedNode,setSelectedNode]=useState<TreeNode|null>(null);
  const allNodes=useStore((s)=>s.nodes);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = {
    Account: CustomNode,
    Loan: CustomNode,
    Collateral: CustomNode,
  };

  const onNodeClick=(_: React.MouseEvent, node:Node)=>{
    const fullNode=allNodes.find((n)=>n.id===node.id) || null;
    setSelectedNode(fullNode);
  }

  return (
    <div>
      <div className="h-screen w-3/4">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background/>
        <Controls />
      </ReactFlow>
    </div>
    <div className='h-screen w-1/4'>
    <SidePanel onClose={()=>setSelectedNode(null)} selectedNode={selectedNode}/>
    </div>
    </div>
    
  );
}
