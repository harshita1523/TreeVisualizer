import { Handle, Position, type NodeProps } from "react-flow-renderer";
import type { NodeType } from "../data/types";

const CustomNode=({data,type}:NodeProps)=>{
    const baseStyle = 'rounded shadow-md px-4 py-2 text-sm text-white';
  const colorMap: Record<NodeType, string> = {
    Account: 'bg-blue-600',
    Loan: 'bg-green-600',
    Collateral: 'bg-yellow-500',
  };
    return <div className={`${baseStyle} ${colorMap[type as NodeType]}`}>
        <div className="font-semibold">{type}</div>
        <div>ID: {data.label}</div>

        <Handle type="target" position={Position.Top} className="w-2 h-2 bg-white"/>
        <Handle type="source" position={Position.Bottom}  className="w-2 h-2 bg-white"/>

    </div>
}

export default CustomNode;