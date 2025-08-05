import ReactFlow, { Background, Controls, useEdges, useEdgesState, useNodesState, type Node } from 'react-flow-renderer';
import CustomNode from './CustomNode';
import SidePanel from './SidePanel';
import React, { useEffect, useState } from 'react';
import type { TreeNode } from '../data/types';
import { useStore } from '../context/store';
import { getLayoutedElements } from '../flow/layout';


export default function FlowCanvas() {

  const storeNodes=useStore((s)=>s.nodes);
  const storeEdges=useStore((s)=>s.edges);
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(storeNodes, storeEdges);




  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedNode,setSelectedNode]=useState<TreeNode|null>(null);
  const nodeTypes = {
    Account: CustomNode,
    Loan: CustomNode,
    Collateral: CustomNode,
  };

  useEffect(()=>{
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

  },[storeEdges,storeNodes])

  const onNodeClick=(_: React.MouseEvent, node:Node)=>{
    const fullNode=storeNodes.find((n)=>n.id===node.id) || null;
    setSelectedNode(fullNode);
  }

  return (
    <div className='flex'>
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
