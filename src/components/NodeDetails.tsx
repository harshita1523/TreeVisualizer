import { Typography, Tooltip, } from "antd";
import { Copy } from "lucide-react";
import type { TreeNode } from "../data/types";
import { copyToClipboardWithMessage } from "../utils/helperFunctions";

const { Text } = Typography;

export default function NodeDetails({ node }: { node: TreeNode }) {
  

  return (

    <div className="mb-4 text-sm text-gray-700 space-y-2">
      <div className="flex items-center gap-2">
        <Text strong>ID:</Text>
        <Text code className="break-all">{node.id}</Text>
        <Tooltip title="Copy ID">
          <button onClick={()=>copyToClipboardWithMessage(node.id,"ID")} className="p-1 hover:text-blue-500">
            <Copy size={16} />
          </button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <Text strong>Type:</Text>
        <Text>{node.type}</Text>
      </div>

      <div className="flex items-center gap-2">
        <Text strong>Label:</Text>
        <Text>{node.data.label}</Text>
      </div>
    </div>
  );
}
