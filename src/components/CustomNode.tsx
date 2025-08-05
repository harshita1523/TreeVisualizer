import { Handle, Position, type NodeProps } from 'react-flow-renderer';
import type { NodeType } from '../data/types';
import { NODE_CONFIG } from '../data/nodeConfig';
import { Divider } from 'antd';


const CustomNode = ({ data, type }: NodeProps) => {
  const {bgClass,borderColor,icon:Icon,iconClass}=NODE_CONFIG[type as NodeType];

  return (
    <div
      className={`
        relative rounded-xl border shadow-md px-4 py-3 text-sm
        ${bgClass} ${borderColor}
        min-w-[120px] text-gray-800
      `}
    >
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-gray-600"
      />

      {/* Icon + Title */}
      <div className="flex items-center justify-start gap-2 font-semibold mb-1">
        <Icon className={iconClass}/>
        <span className="capitalize text-sm">{type}</span>
      </div>
    

      {/* Label */}
      <div className="text-xs truncate text-gray-700 font-medium mt-3">{data.label}</div>

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-gray-600"
      />
    </div>
  );
};

export default CustomNode;
 