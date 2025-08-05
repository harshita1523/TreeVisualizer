import React from 'react'
import { NODE_RULES, type TreeNode } from '../data/types'
import { useStore } from '../context/store';

interface SidePanelProps{
    selectedNode:TreeNode | null;
    onClose:()=>void;
}

const SidePanel:React.FC<SidePanelProps> = ({selectedNode,onClose}) => {


    const addNode=useStore((s)=>s.addNode);
    const deleteNode=useStore((s)=>s.deleteNode);

   if(!selectedNode) return null;
   
   
   const allowedChildren=NODE_RULES[selectedNode.type];

   return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{selectedNode.type}</h2>
        <button onClick={onClose} className="text-sm text-gray-500">✖</button>
      </div>

      <p className="text-sm mb-2"><span className="font-medium">Node ID:</span> {selectedNode.id}</p>

      <h3 className="font-semibold mt-4 mb-2">Add Child</h3>
      {allowedChildren.length > 0 ? (
        allowedChildren.map((childType) => (
          <button
            key={childType}
            onClick={() => addNode(selectedNode.id, childType)}
            className="mb-2 w-full py-2 px-3 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            ➕ Add {childType}
          </button>
        ))
      ) : (
        <p className="text-xs text-gray-500 italic">No valid children</p>
      )}

      <hr className="my-4" />

      <button
        onClick={() => {
          deleteNode(selectedNode.id);
          onClose();
        }}
        className="w-full py-2 px-3 rounded bg-red-600 text-white text-sm hover:bg-red-700"
      >
        🗑️ Delete Node
      </button>
    </div>
  );
}

export default SidePanel
